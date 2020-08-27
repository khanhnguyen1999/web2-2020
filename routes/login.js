const User = require('../services/user')
const Account = require('../services/account')
const {Router} = require('express')
const asyncHandler = require('express-async-handler')
const router = new Router();
router.get('/',function getLogin(req,res){
    res.render('pages/login')
});
router.post('/',asyncHandler(async function postLogin(req,res){
    const{data} =req.body;
    console.log(data)
    var user = await User.findByUsername(data.userName)
    if(!user || !User.verifyPassword(data.password,user.password)){
        return res.json({success:false})
    }
    const account =await Account.findByUserId(user.id)

    user.dataValues.role = account.role;
    user.dataValues.status = account.status;
    console.log(user.role)

    console.log(user)
    console.log("sdasdasda")

    return res.json({success : true , user })   
}));
module.exports = router;
