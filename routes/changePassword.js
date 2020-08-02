const User = require("../services/user");
const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Email = require("../services/email");
const crypto = require("crypto");

var signal = false; // Changing password

router
    .route("/")
    .get((req, res) => {
        const user = req.session.currentUser;

        if (user) {
            if (user.tokenUser) {
                signal = true; // Recovering password
            }
        }

        res.render("./ducbui/pages/auth/changePassword", { errors: null, signal });
    })
    .post(
        [
            body("currentPassword", "Current password is required!")
                .trim()
                .custom(async (currentPassword, { req }) => {
                    const user = req.session.currentUser;
                    if (user.tokenUser) {
                        return true;
                    } else {
                        if (!currentPassword) {
                            return false;
                        }
                        return true;
                    }
                }),
            body("newPassword", "New password is required! At least 6 characters.").trim().isLength({ min: 6 }),
            body("confirmPassword", "Confirm password is required! At least 6 characters.").trim().isLength({ min: 6 }),
        ],
        asyncHandler(async (req, res, next) => {
            let errors = validationResult(req);
            console.log(errors);

            if (!errors.isEmpty()) {
                return res.status(422).render("./ducbui/pages/auth/changePassword", { errors: errors.errors });
            }

            const { newPassword, confirmPassword } = req.body;
            let check = false;
            // Initial Current User
            const currentUser = req.session.currentUser;

            const user = await User.findByEmail(currentUser.email);

            // Checking signal
            if (!signal) {
                //- False -> Changing password
                const { currentPassword } = req.body;
                check = User.verifyPassword(currentPassword, user.password);
            } else {
                //- True -> Recovering password
                check = true;
            }

            if (check) {
                if (newPassword === confirmPassword) {
                    await User.update(
                        {
                            password: User.hashPassword(newPassword),
                            tokenUser: null,
                        },
                        {
                            where: {
                                id: currentUser.id,
                            },
                        }
                    );
                    if (!signal) {
                        return res.redirect(`/profile/${user.id}`);
                    }
                    return res.redirect("/");
                } else {
                    errors = { errors: [{ msg: "Confirn password wrong!" }] };
                }
            } else {
                errors = { errors: [{ msg: "Current password wrong!" }] };
            }

            res.render("./ducbui/pages/auth/changePassword", { errors: errors.errors, signal });
        })
    );

module.exports = router;
