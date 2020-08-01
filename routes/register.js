const User = require("../services/user");
const Account = require("../services/account");
const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Email = require("../services/email");

router
    .route("/")
    .get((req, res) => {
        res.render("pages/register");
    })

    .post(
        [
            body("email")
                .isEmail()
                .normalizeEmail()
                .custom(async function (email) {
                    const found = await User.findByEmail(email);
                    if (found) {
                        throw Error("User exists");
                    }
                    return true;
                }),
            body("username").trim().notEmpty(), // Need Handle
            body("displayName").trim().notEmpty(),
            body("password").isLength({ min: 6 }).notEmpty(),
            body("conf_password").isLength({ min: 6 }).notEmpty(),
        ],
        asyncHandler(async (req, res) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(422).render("pages/register", { errors: errors.array() });
            }
            const user = await User.create({
                username: req.body.username,
                email: req.body.email,
                displayName: req.body.displayName,
                password: User.hashPassword(req.body.password),
            })
                .then(async (user) => {
                    await Account.create({
                        accountNumber: "970460" + (Math.floor(Math.random() * 10000000000) + 1), // Fixed
                        balance: 100000,
                        currencyUnit: "VND",
                        openDate: user.createdAt,
                        role: "user",
                        status: "UNVERIFIED", // 'UNVERIFIED' || 'LOCKED' || 'PENDING' || 'ACTIVE' || 'DENIED'
                        limit: 0,
                        userId: user.id,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });

            // await Email.send(user.email,'Mã kích hoạt tài khoản',`link activate của bạn là : ${process.env.BASE_URL}/login/${user.id}/${user.token}`)
            res.redirect("/");
        })
    );

module.exports = router;
