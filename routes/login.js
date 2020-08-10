const User = require("../services/user");
const router = require("express").Router();
const asyncHandler = require("express-async-handler");

router
    .route("/")
    .get((req, res) => {
        if(!req.session.userId){
            res.render("ducbui/pages/auth/login", { errors: null });
        }
        else{
            res.redirect("/home")
        }
    })
    .post(
        asyncHandler(async (req, res) => {
            const { username, password } = req.body;
            const user = await User.findByUsername(username);

            if (!user || !User.verifyPassword(password, user.password)) {
                return res.redirect("/");
            }

            req.session.userId = user.id;
            res.redirect("/home");
        })
    );

module.exports = router;
