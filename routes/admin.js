const router = require('express').Router();
const Account = require('../services/account');
const asyncHandler = require('express-async-handler');
const User = require('../services/user');
const { Sequelize } = require('sequelize');

router.get('/', asyncHandler(async (req, res) => {
    const account = await Account.findAccountrByUserId(req.currentUser.id);

    if (account) {
        return res.render('./pages/admin/admin');
    }

    res.redirect('/logout');
}));

router.get('/users', asyncHandler(async (req, res) => {
    const users = [];
    res.render('./pages/admin/users', { users });
}));

router.post('/users', asyncHandler(async (req, res) => {
    const { search } = req.body;

    const users = await Account.findAll({
        where: {
            role: 'user',
        },
        where: {
            accountNumber: search,
        },
    }).then((data) => {
        data.forEach(async (user) => {
            const u = await User.findOne({
                where: {
                    id: user.userId,
                }
            });
        });
    }).catch((err) => {
        console.log(err);
    });

    console.log(`>>>> ${users}`);

    res.render('./pages/admin/users', { users });
}));

module.exports = router;