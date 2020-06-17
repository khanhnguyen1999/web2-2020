const User = require('../services/user')
const {Router} = require('express')
const {body,validationResult} = require('express-validator')
const crypto = require('crypto')
const asyncHandler = require('express-async-handler')
const Email = require('../services/email')
const router = new Router();
router.get('/',function isRegister(req,res){
    res.render('pages/register')
});
router.post('/',[
    body('email')
        .isEmail()
        .normalizeEmail()
        .custom(async function(email){
            const found = await User.findUserByEmail(email);
            if(found){
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
        .isLength({min:6})
        .notEmpty(),
    body('conf_password')
        .isLength({min:6})
        .notEmpty(),
],asyncHandler(async function Register(req,res){
    const errors = validationResult(req);
    // console.log('errors ',errors)
    console.log('password: ',req.body.password)
    console.log('confirm password: ',req.body.conf_password)
   
    if(!errors.isEmpty()){
        return res.status(422).render('pages/register',{errors:errors.array()});
    }
    const user = await User.create({
        username:req.body.username,
        email:req.body.email,
        displayName:req.body.displayName,
        password:User.hashPassword(req.body.password),
        role:'user'
    })
    // await Email.send(user.email,'Mã kích hoạt tài khoản',`link activate của bạn là : ${process.env.BASE_URL}/login/${user.id}/${user.token}`)
    res.redirect('/')
}));
module.exports = router;