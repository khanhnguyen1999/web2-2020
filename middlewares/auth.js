const Account = require('../services/account')
const asyncHandler = require('express-async-handler')
module.exports = asyncHandler( async function auth(req,res,next)
{
    res.locals.user ={
        email:'chi1caithoi@gmail.com',
        displayName:'khai dang1',
        id:'1'};
    const account = await Account.findAccountrByUserId(res.locals.user.id);
    res.locals.account = account;
    next();
});