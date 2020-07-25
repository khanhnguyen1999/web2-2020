const User = require('../services/user');
const router = require('express').Router();
const crypto = require('crypto')
const asyncHandler = require('express-async-handler');
const Email = require('../services/email');

router.get('/', (req, res) => {
    res.render('pages/forgot');
});

router.post('/', asyncHandler(async (req, res) => {
    if (!req.body.emailchecking) {
        return;
    }

    await User.update({
        tokenUser: crypto.randomBytes(3).toString('hex').toUpperCase(),
    }, { 
        where: { 
            email: req.body.emailchecking }
        });

    const users = await User.findUserByEmail(req.body.emailchecking);
    await Email.send(req.body.emailchecking, 'THAY ĐỔI MẬT KHẨU NGÂN HÀNG', `link đổi mật khẩu của bạn là : ${process.env.BASE_URL}/changepass/${req.body.emailchecking}/${users.tokenUser}`);
    res.redirect('/sendtokenforgot');
}));

module.exports = router;