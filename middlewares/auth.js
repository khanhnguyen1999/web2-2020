const Account = require('../services/account');
const User = require('../services/user.js')
const asyncHandler = require('express-async-handler')

module.exports = asyncHandler(async function auth(req,res,next){
    const userId = req.session.userId;
    res.locals.currentUser = null;
    if(!userId){
        return next();
    }
    const user = await User.findById(userId)
    if(!user){
        return next();
    }
    
    req.currentUser =user;
    res.locals.currentUser = user;
   
    
    if(user){
        const account = await Account.findByUserId(req.currentUser.id);
        res.locals.account = account;
        req.session.account = account;
        req.session.currentUser = user;
        return next();
    }
   
 
    next();
});
