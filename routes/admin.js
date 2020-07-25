const router = require('express').Router();
const Account = require('../services/account');
const User = require('../services/user');
const Transaction = require('../services/transaction');
const asyncHandler = require('express-async-handler');
const { Sequelize } = require('sequelize');
const { body, validationResult } = require('express-validator');
const Op = Sequelize.Op;

router.get('/', asyncHandler(async (req, res) => {
    req.currentUser = req.currentUser ? req.currentUser : [];
    const account = await Account.findByUserId(req.currentUser.id);

    if (account) {
        return res.render('./ducbui/pages/admin/admin');
    }

    res.redirect('/logout');
}));

router.get('/users', asyncHandler(async (req, res) => {
    const users = [];
    res.render('./ducbui/pages/admin/users', { users });
}));

/// Find user
// Find user by Username, Account Number, Email
router.post('/users', asyncHandler(async (req, res) => {
    const { search } = req.body;
    let result = [];

    result = await Account.findAll({
        where: {
            role: 'user',
        },
        include: [
            {
                model: User,
                where: {
                    [ Op.or ]: [ {
                        email: { [ Op.like ]: '%' + search + '%', }
                    },
                    {
                        username: { [ Op.like ]: '%' + search + '%', }
                    } ]
                },
            },
        ]
    });

    if (result.length === 0) {
        result = await Account.findAll({
            where: {
                role: 'user',
                accountNumber: { [ Op.like ]: '%' + search + '%' },
            }
        });
    }

    res.render('./ducbui/pages/admin/users', { users: result });
}));

// Find pending users
router.get('/users/management', asyncHandler(async (req, res) => {
    const users = await Account.findAll({
        where: {
            role: 'user',
            status: 'PENDING', // Should be 'UNVERIFIED' || 'LOCKED' || 'ACTIVE' || 'PENDING' || 'DENIED'
        }
    });

    res.render('./ducbui/pages/admin/users', { users });
}));

// Verify CardID
// - Accept
router.get('/users/:id/verify-accept', asyncHandler(async (req, res) => {
    const { id } = req.params;

    const account = await Account.findByUserId(id);
    if (account) {
        await Account.update({
            status: 'ACTIVE',
            limit: 20000000,
        }, {
            where: {
                userId: id,
            }
        });
    }

    // const user = await User.findUserById(id);
    res.redirect(`/admin/users/${id}`);
}));

// - Deny
router.get('/users/:id/verify-deny', asyncHandler(async (req, res) => {
    const { id } = req.params;

    const account = Account.findByUserId(id);
    if (account) {
        await Account.update({
            status: 'DENIED',
        }, {
            where: {
                userId: id,
            }
        });
    }
    res.redirect(`/admin/users/${id}`);
}));
// End Verify CardID
/// End find user

/// Check user profile
router.get('/users/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findUserById(id);
    const account = await Account.findByUserId(id);

    res.locals.transactions = []; // Marked

    res.render(`./ducbui/pages/admin/details`, { user, account });
}));

// Lock/Unlock account
router.get('/users/:id/lock', asyncHandler(async (req, res) => {
    const { id } = req.params;

    const account = await Account.findByUserId(id);
    let status = null;

    if (account.status === 'ACTIVE') {
        status = 'LOCKED';
    } else if (account.status === 'LOCKED') {
        status = 'ACTIVE';
    }

    if (account) {
        await Account.update({
            status,
        }, {
            where: {
                userId: id,
            }
        });
    }

    // const user = await User.findUserById(id);

    // res.render(`./ducbui/pages/admin/details`, { user, account });
    res.redirect('back');
}));
/// End check user profile

/// Check user's transactions
router.get('/users/:id/transaction', asyncHandler(async (req, res) => {
    const { id } = req.params;

    const account = await Account.findByUserId(id);
    if (account) {
        const transactions = await Transaction.findAll({
            where: {
                [ Op.or ]: [
                    {
                        accountNumber: account.accountNumber,
                    },
                    {
                        beneficiaryAccount: account.accountNumber,
                    }
                ]
            }
        });

        res.locals.transactions = transactions; // Marked
    }

    // res.redirect(`/admin/users/${id}`);
    res.render(`./ducbui/pages/admin/transactions`, { transactions: res.locals.transactions, account });
}));
/// End Check user's transactions

/// Transfer
router.get('/users/:id/transfer', asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findUserById(id);
    if (user) {
        return res.render('./ducbui/pages/admin/transfer', { user });
    }

    res.redirect('back');
}));

router.post('/users/:id/transfer',[
    body('amount')
        .isNumeric()
        .notEmpty()
] ,asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(442).json({ errors: errors.array() });
    }

    const account = await Account.findByUserId(id);
    if (account) {
        const balance = Number(account.balance) + Number(amount);
        console.log(balance);
        await Account.update({
            balance,
        }, {
            where: {
                userId: id,
            }
        });
    }

    res.redirect(`/admin/users/${id}`);
}));
/// End Transfer

/// Edit user profile
router.get('/users/:id/modify', asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findUserById(id);
    if (user) {
        req.session.currentCustomer = user;
        return res.render(`./ducbui/pages/admin/editProfile`, { user });
    }

    res.redirect('back');
}));

router.post('/users/:id/modify', [
    body('email')
        .isEmail()
        .optional()
        .normalizeEmail()
        .custom(async (email, { req }) => {
            const found = await User.findUserByEmail(email);

            if (found && email !== req.session.currentCustomer.email) {
                throw Error("User exists");
            }

            return true;
        }),
    body('username')
        .optional()
        .custom(async (username, { req }) => {
            const found = await User.findUserByUserName(username);

            if (found && username !== req.session.currentCustomer.username) {
                throw Error("User exists");
            }

            return true;
        }),
    body('displayName')
        .trim()
        .optional(),
    body('cardId')
        .trim()
        .optional()
    // .isLength({ min: 9, max: 9 }),
], asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { email, username, displayName, cardId } = req.body;

    const errors = validationResult(req);

    // API here
    if (!errors.isEmpty()) {
        return res.status(442).json({ errors: errors.array() });
    }

    user = await User.findUserById(id);

    if (user) {
        await User.update({
            email: email ? email : user.email,
            username: username ? username : user.username,
            displayName: displayName ? displayName : user.displayName,
            cardId: cardId ? cardId : user.cardId,
        }, {
            where: {
                id,
            }
        });
    }

    res.redirect(`/admin/users/${id}`);
}));
/// End edit user profile

module.exports = router;