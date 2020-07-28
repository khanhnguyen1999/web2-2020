const User = require("../services/user");
const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Email = require("../services/email");
const crypto = require("crypto");

router
    .route("/")
    .get((req, res) => {
        res.render("../views/pages/forgetPassword");
    })
    .post(
        asyncHandler(async (req, res, next) => {
            const { email } = req.body;

            const user = await User.findByEmail(email);

            if (user) {
                token = crypto.randomBytes(2).toString("hex").toUpperCase();
                req.session.currentUser = user.email;
                res.locals.currentUser = user.email;
                console.log(user.email);
                await User.update(
                    {
                        tokenUser: token,
                    },
                    {
                        where: {
                            id: user.id,
                        },
                    }
                );

                await Email.send(email, "Forget Password", `${process.env.BASE_URL || "http://localhost:3000"}/forget-password/change-password/${token}`);
                return res.render("../views/pages/error", {
                    error: "Check your email.",
                });
            } else {
                res.render("../views/pages/error", { error: "Email not exists." });
            }
        })
    );

router
    .route("/change-password/:token")
    .get(
        asyncHandler(async (req, res) => {
            const { token } = req.params;
            const { email } = res.locals.currentUser;

            const user = await User.findByEmail(email);
            if (user.tokenUser === token) {
                res.render("../views/pages/changePassword");
            } else {
                res.render("../views/pages/error", { error: "Wrong token" });
            }
        })
    )
    .post(
        asyncHandler(async (req, res) => {
            const { newPass, confPass } = req.body;
            if (newPass === confPass) {
                await User.update(
                    {
                        password: User.hashPassword(newPass),
                        tokenUser: null,
                    },
                    {
                        where: {
                            id: res.locals.currentUser.id,
                        },
                    }
                );
                res.redirect("/");
            } else {
                res.redirect("back");
            }
        })
    );

module.exports = router;
