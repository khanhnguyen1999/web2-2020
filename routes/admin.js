const router = require('express').Router();
const Account = require('../services/account');
const asyncHandler = require('express-async-handler');
const User = require('../services/user');
const { Sequelize } = require('sequelize');
const { body, validationResult } = require('express-validator');
const Op = Sequelize.Op;

router.get('/', asyncHandler(async (req, res) => {
    req.currentUser = req.currentUser ? req.currentUser : [];
    const account = await Account.findAccountrByUserId(req.currentUser.id);

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

    console.log(result);

    res.render('./ducbui/pages/admin/users', { users: result });
}));

// # Pending - Find pending user
router.get('/users/management', asyncHandler(async (req, res) => {
    const users = await Account.findAll({
        where: {
            role: 'user',
            status: false, // Should be 'LOCKED' || 'PENDING' || '...'
        }
    });

    res.render('./ducbui/pages/admin/users', { users });
}));
/// End find user

/// View user profile
router.get('/users/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findUserById(id);

    res.render(`./ducbui/pages/admin/details`, { user });
}));

// Lock/Unlock account
router.get('/lock/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;

    const account = await Account.findAccountrByUserId(id);
    if (account) {
        await Account.update({
            status: account.status ? false : true,
        }, {
            where: {
                userId: id,
            }
        });
    }

    const user = await User.findUserById(id);
    if (user) {
        await User.update({
            tokenUser: account.status ? 'LOCKED' : null,
        }, {
            where: {
                id,
            }
        });
    }

    res.render(`./ducbui/pages/admin/details`, { user });
}));
/// End view user profile

/// Edit user profile
router.get('/edit/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findUserById(id);
    if (user) {
        req.session.currentCustomer = user;
        return res.render(`./ducbui/pages/admin/editProfile`, { user });
    }

    res.redirect('back');
}));

router.post('/edit/:id', [
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
        .isLength({ min: 9, max: 9 }),
], asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { email, username, displayName, cardId } = req.body;

    const errors = validationResult(req);

    // API here
    if (!errors.isEmpty()) {
        return res.status(442).json({ errors: errors.array() });
    }

    user = await User.findUserById(id);

    console.log(user);

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