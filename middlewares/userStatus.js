const Account = require('../services/account');
var mess = async function(req,res,next){
    var message;
    const {userId} = req.body;
    const account = await Account.findByUserId(userId);
    console.log(userId)
    console.log(account);
    if(account.status==="PENDING")
    {
        message = "Vui lòng cho xac thuc";
        return res.json( { success : false,error: message });
    }
    if(account.status==="ACTIVE")
    {
        next();
    }
    if(account.status==="LOCKED")
    {
        message = "Tai khoan dang bi khoa";
        return res.json( { success : false,error: message });
    }
    if(account.status==="UNVERIFIED")
    {
        message = "Tai khoan tai chua xac thuc";
        return res.json( { success : false,error: message });
    }

}

module.exports = mess;