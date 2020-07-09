const User = require('../services/user')
const {Router} = require('express')
const asyncHandler = require('express-async-handler')
const router = new Router();
router.get('/',function getLogin(req,res){
    res.render('pages/login')
});
router.post('/',asyncHandler(async function postLogin(req,res){
    const user = await User.findByUsername(req.body.acc_username)
    if(!user || !User.verifyPassword(req.body.acc_password,user.password)){
        return res.redirect('/')
    }
    req.session.userId = user.id;
    // currentUser = user.id;
    res.redirect('/home')   
}));
module.exports = router;