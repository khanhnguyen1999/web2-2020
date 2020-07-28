var mess = function(req,res,next){
    var message;
    console.log(">>>HJ");
    if(req.session.account.status==="PENDING")
    {
        message = "Vui lòng cho xac thuc";
        return res.render("./pages/error", { error: message });
    }
    if(req.session.account.status==="ACTIVE")
    {
        next();
    }
    if(req.session.account.status==="LOCKED")
    {
        message = "Tai khoan dang bi khoa";
        return res.render("./pages/error", { error: message });
    }
    if(req.session.account.status==="UNVERIFIED")
    {
        message = "Tai khoan tai chua xac thuc";
        return res.render("./pages/error", { error: message });
    }

}

module.exports = mess;