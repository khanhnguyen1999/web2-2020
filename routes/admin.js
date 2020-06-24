const router = require('express').Router();
const Account = require('../services/account');
const asyncHandler = require('express-async-handler');
const User = require('../services/user');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

router.get('/', asyncHandler(async (req, res) => {
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
router.post('/users', asyncHandler(async (req, res) => {
    const { search } = req.body;
    var re = [];

    const result = await Account.findAll({
        where: {
            role: 'user',
        },
    }).then(asyncHandler(async (data) => {
        // Find by accountNumber
        data.forEach(user => {
            if (contains(user.accountNumber, search, 0, 0) === 1) {
                re.push(user);
            }
        });
        // --

        // Find by email
        // if (re.length === 0) {
        //     data.forEach(asyncHandler(async (user) => {
        //         const u = await User.findOne({
        //             where: {
        //                 id: user.userId,
        //             }
        //         }).then((user) => {
        //             if (contains(user.email, search, 0, 0) === 1) {
        //                 // await console.log(user.email);
        //                 return user;
        //             }
        //         }).catch((err) => {
        //             console.log(err);
        //         });

        //         re.push(user);
        //     }));

        // console.log(users);
        // }
        // --

        // console.log(re);

        return re;
    })).catch((err) => {
        console.log(err);
    });

    res.render('./ducbui/pages/admin/users', { users: result });
}));

// # Pending - Find pending user
router.get('/users/management', asyncHandler(async (req, res) => {
    const users = await Account.findAll({
        where: {
            role: 'user',
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

    user = await User.findUserById(id);
    if (user) {
        return res.render(`./ducbui/pages/admin/editProfile`, { user });
    }
    res.json(404).redirect('back');
}));
// # Pending - get user id to update profile
router.post('/edit/:id', asyncHandler(async (req, res) => {
    // const { id } = 
}));
/// End edit user profile

function exactMatch(text, pat, text_index, pat_index) {
    if (text_index === text.length && pat_index !== pat.length) {
        return 0;
    }

    if (pat_index === pat.length) {
        return 1;
    }

    if (text[ text_index ] === pat[ pat_index ]) {
        return exactMatch(text, pat, text_index + 1, pat_index + 1);
    }

    return 0;
}

function contains(text, pat, text_index, pat_index) {
    if (text_index === text.length) {
        return 0;
    }

    if (text[ text_index ] === pat[ pat_index ]) {
        if (exactMatch(text, pat, text_index, pat_index)) {
            return 1;
        } else {
            return contains(text, pat, text_index + 1, pat_index);
        }
    }

    return contains(text, pat, text_index + 1, pat_index);
}

module.exports = router;