const User = require('../services/user');
const Account = require('../services/account');
const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');
const asyncHandler = require('express-async-handler');
const Email = require('../services/email');

router.get('/', (req, res) => {
    res.render('pages/register');
});

router.post('/', [
    body('email')
        .isEmail()
        .normalizeEmail()
        .custom(async function (email) {
            const found = await User.findUserByEmail(email);
            if (found) {
                throw Error('User exists')
            }
            return true;
        }),
    body('username')
        .trim()
        .notEmpty(),
    body('displayName')
        .trim()
        .notEmpty(),
    body('password')
        .isLength({ min: 6 })
        .notEmpty(),
    body('conf_password')
        .isLength({ min: 6 })
        .notEmpty(),
], asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    // console.log('errors ',errors)
    console.log('password: ', req.body.password);
    console.log('confirm password: ', req.body.conf_password);

    if (!errors.isEmpty()) {
        return res.status(422).render('pages/register', { errors: errors.array() });
    }

    await User.create({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName,
        password: User.hashPassword(req.body.password),
    }).then((user) => {
        await Account.create({
            accountNumber: 970460 + Math.floor(Math.random() * 1000) + 1,
            balance: 100000,
            currencyUnit: 'VND',
            status: false,
            limit: 0,
            userId: user.id,
            role: 'user',
            openDate: user.createdAt,
        });
    }).catch((err) => {
        console.log(`>>> ${err}`);
    });

    // await Email.send(user.email,'Mã kích hoạt tài khoản',`link activate của bạn là : ${process.env.BASE_URL}/login/${user.id}/${user.token}`)
    res.redirect('/');
}));

module.exports = router;