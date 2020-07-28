const User = require("../services/user");
const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Email = require("../services/email");
const crypto = require("crypto");

router
    .route("/")
    .get((req, res) => {
        res.render("../views/pages/changePassword1");
    })
    .post(
        asyncHandler(async (req, res, next) => {
            const { curPass, newPass, confPass } = req.body;

            const user = User.findByEmail(req.currentUser);
            const check = User.verifyPassword(user.password, curPass);

            if (check) {
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
                    return res.redirect("/");
                }
            }

            res.redirect("back");
        })
    );

module.exports = router;
