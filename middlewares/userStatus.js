var mess = function (req, res, next) {
    var msg;
    var signal = false;
    var custom = "<a href='/verify' class='btn btn-primary btn-sm'>Verify Account</a>";

    if (req.session.account.status === "ACTIVE") {
        return next();
    }
    if (req.session.account.status === "PENDING") {
        msg = "Vui long cho xac thuc";
    }
    if (req.session.account.status === "LOCKED") {
        msg = "Tai khoan dang bi khoa";
    }
    if (req.session.account.status === "UNVERIFIED") {
        msg = "Tai khoan tai chua xac thuc";
        signal = true;
    }
    return res.render("ducbui/pages/errors", { errors: [{ msg, signal, custom }] });
};

module.exports = mess;
