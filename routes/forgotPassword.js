const User = require("../services/user");
const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Email = require("../services/email");
const cryptojs = require("cryptojs");
const crypto = require("crypto");
const Op = require("sequelize").Op;

var result = null;

router
    .route("/")
    .get((req, res) => {
        var errors = null;
        res.render("./ducbui/pages/auth/forgotPassword/forgotPassword", { errors });
    })
    .post(
        asyncHandler(async (req, res, next) => {
            const { data } = req.body;

            result = await User.findOne({
                where: {
                    [Op.or]: [
                        {
                            email: data,
                        },
                        {
                            username: data,
                        },
                        {
                            cardId: data,
                        },
                    ],
                },
            });

            if (result) {
                res.json({success : true})
                return next();
            }
            else {
                return res.json({success : false})
            }
            
        }),
        async (req, res, next) => {
            console.log(result);
            if (result) {
                token = crypto.randomBytes(2).toString("hex").toUpperCase();
                // req.session.currentUser = result.email;
                req.session.recoverEmail = result.email;
                // res.locals.currentUser = result.email;
                console.log(result.email);
                await User.update(
                    {
                        tokenUser: token,
                    },
                    {
                        where: {
                            id: result.id,
                        },
                    }
                );

                // const recoverLink = `${process.env.BASE_URL || "http://localhost:3000"}/forgot-password/change-password/?token=${token}`;
                const recoverLink = `${process.env.BASE_URL || "http://localhost:3000"}/forgot-password/check-token/${result.email}/${token}`;

                console.log(recoverLink);

                const usr = await User.findById(result.id)
                await Email.send(usr.email, "Forget Password", recoverLink);
                // return res.render("../views/pages/error", {
                //     errors: [{ msg: "Access your temporary link in your email within 3 minutes to recover your account." }],
                // });
            }
            // else {
            //     res.render("../views/pages/error", { errors: [{ msg: "Email dose not exists." }] });
            // }
        }
    );
// I'm here. Automatic checking token!
router
    .route("/check-token")
    .post(async (req, res, next) => {
        const { data } = req.body;
        console.log("adasdasd")
        console.log(data)
        const user = await User.findByEmail(data.email);

        if (user) {
            if (user.tokenUser === data.token) {
                res.json({success:true});
            } else {
                res.json({success:false});
            }
        } else {
            res.json({success:false});
        }
    });

module.exports = router;
