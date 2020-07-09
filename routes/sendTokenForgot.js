const User = require('../services/user')
const {Router} = require('express')
const crypto = require('crypto')
const asyncHandler = require('express-async-handler')
const Email = require('../services/email')
const router = new Router();
router.get('/',function isForgot(req,res){
    res.render('pages/forgot')
});
router.post('/',asyncHandler(async function(req,res){
    if(!req.body.emailchecking){
        return;
    }
    const user = await User.update({
        tokenUser:crypto.randomBytes(3).toString('hex').toUpperCase(),
    },{ where: {email: req.body.emailchecking} })
    const users = await User.findByEmail(req.body.emailchecking)
    await Email.send(req.body.emailchecking,'THAY ĐỔI MẬT KHẨU NGÂN HÀNG',`link đổi mật khẩu của bạn là : ${process.env.BASE_URL}/changepass/${req.body.emailchecking}/${users.tokenUser}`)
    res.redirect('/sendtokenforgot')
}))
module.exports = router;