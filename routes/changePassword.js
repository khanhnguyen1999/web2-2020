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
            body("data.currentPassword", "Current password is required!")
            .custom(async (currentPassword, { req }) => {
                console.log("adasdasda  " +currentPassword)
                if(currentPassword)
                {
                    const {user} = req.body.data;
                    let check = User.verifyPassword(user.password,currentPassword)
                    if (!check) {
                        return false;
                    }
                }
                
                return true;
            }),
            body("data.newPassword", "New password is required! At least 6 characters.").trim().isLength({ min: 6 }),
            body("data.confirmPassword", "Confirm password is required! At least 6 characters.").trim().isLength({ min: 6 }),
        ],
        asyncHandler(async (req, res, next) => {
            const {user,currentPassword} = req.body.data;
            console.log( req.body.data)
            if (user) {
                if (user.tokenUser) {
                    signal = true; // Recovering password
                }
            }
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                console.log(errors);
                return res.json({success:false,errors:errors.errors})
            }

            const { newPassword, confirmPassword } = req.body.data;
            let check = false;
            // Initial Current User
            // const currentUser = user;

            // const user = await User.findByEmail(currentUser.email);

            // Checking signal
            if (!signal) {
                //- False -> Changing password
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
                                id: user.id,
                            },
                        }
                    );
                    if (!signal) {
                        return res.json({success:true})
                        // return res.redirect(`/profile/${user.id}`);
                    }
                    return res.json({success:true})
                } else {
                    errors = { errors: [{ msg: "Confirn password wrong!" }] };
                }
            } else {
                errors = { errors: [{ msg: "Current password wrong!" }] };
            }
            res.json({success:false,errors:errors.errors})
            // res.render("./ducbui/pages/auth/changePassword", { errors: errors.errors, signal });
        })
    );

module.exports = router;
