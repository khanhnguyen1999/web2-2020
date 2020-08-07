const User = require('../services/user')
const {Router} = require('express')
const asyncHandler = require('express-async-handler')
const router = new Router();
router.get('/',function getLogin(req,res){
    res.render('pages/login')
});
router.post('/',asyncHandler(async function postLogin(req,res){
    const{data} =req.body;
    console.log(data)
    const user = await User.findByUsername(data.userName)
    if(!user || !User.verifyPassword(data.password,user.password)){
        return res.json({success:false})
    }

    return res.json({success : true , user})   
}));
module.exports = router;