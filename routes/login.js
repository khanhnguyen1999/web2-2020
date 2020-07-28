const User = require("../services/user");
const router = require("express").Router();
const asyncHandler = require("express-async-handler");

router
    .route("/")
    .get((req, res) => {
        res.render("pages/login");
    })
    .post(
        asyncHandler(async (req, res) => {
            const user = await User.findByUsername(req.body.acc_username);

            if (!user || !User.verifyPassword(req.body.acc_password, user.password)) {
                return res.redirect("/");
            }

            req.session.userId = user.id;
            res.redirect("/home");
        })
    );

module.exports = router;
