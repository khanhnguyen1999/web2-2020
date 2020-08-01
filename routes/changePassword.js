const User = require("../services/user");
const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Email = require("../services/email");
const crypto = require("crypto");

router
    .route("/")
    .get((req, res) => {
        res.render("./ducbui/pages/auth/changePassword", { errors: null });
    })
    .post(
        [body("currentPassword", "Current password is required!").notEmpty().trim(), body("newPassword", "New password is required! At least 6 characters.").trim().isLength({ min: 6 }), body("confirmPassword", "Confirm password is required! At least 6 characters.").trim().isLength({ min: 6 })],
        asyncHandler(async (req, res, next) => {
            let errors = validationResult(req);
            console.log(errors);

            if (!errors.isEmpty()) {
                return res.status(422).render("./ducbui/pages/auth/changePassword", { errors: errors.errors });
            }

            const { currentPassword, newPassword, confirmPassword } = req.body;

            const user = await User.findByEmail(req.currentUser.email);
            const check = User.verifyPassword(currentPassword, user.password);
            console.log(check);
            if (check) {
                if (newPassword === confirmPassword) {
                    await User.update(
                        {
                            password: User.hashPassword(newPassword),
                            tokenUser: null,
                        },
                        {
                            where: {
                                id: res.locals.currentUser.id,
                            },
                        }
                    );
                    return res.redirect(`/profile/${user.id}`);
                } else {
                    errors = { errors: [{ msg: "Confirn password wrong!" }] };
                }
            } else {
                errors = { errors: [{ msg: "Current password wrong!" }] };
            }

            res.render("./ducbui/pages/auth/changePassword", { errors: errors.errors });
        })
    );

module.exports = router;
