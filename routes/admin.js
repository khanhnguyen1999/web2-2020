const router = require('express').Router();
const Account = require('../services/account');
const asyncHandler = require('express-async-handler');
const User = require('../services/user');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

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
// #########################################################
router.post('/users', asyncHandler(async (req, res) => {
    const { search } = req.body;

    console.log('#######');

    const re = [];
    const result = await Account.findAll({
        where: {
            accountNumber: {
                [ Op.like ]: search,
            },
            role: 'user',
        },
        // where: {
        // },
    }).then(async (data) => {
        if (data != null) {
            const user = await User.findOne({
                where: {
                    id: data[ 0 ].userId,
                }
            });

            Object.assign(user, data[ 0 ]);

            // console.log(Object.assign(data[0], user));
            console.log(user);

            // re.push(d);
            // console.log(re);
            return re;
        }
    }).catch((err) => {
        console.log(err);
    });

    console.log(`>>>> ${result}`);

    res.render('./pages/admin/users', { users: result });
}));
// #########################################################

module.exports = router;