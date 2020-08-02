const User = require("../services/user");
const Account = require("../services/account");
const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Email = require("../services/email");

var user = null;

router
    .route("/")
    .get((req, res) => {
        res.render("ducbui/pages/auth/register", { errors: null });
    })

    .post(
        [
            body("displayName").trim().notEmpty(),
            body("username").trim().notEmpty(), // Need Handle
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
            body("password").isLength({ min: 6 }).notEmpty(),
            body("confirmPassword").isLength({ min: 6 }).notEmpty(),
        ],
        async (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(422).render("ducbui/pages/auth/register", { errors: errors.array() });
            }

            const { displayName, username, email, password, confirmPassword } = req.body;

            if (password === confirmPassword) {
                user = {
                    displayName,
                    username,
                    email,
                    password: User.hashPassword(req.body.password),
                };

                return next();
            }
            return res.render("ducbui/pages/auth/register", { errors: [{ msg: "Confirm password not match." }] });
        },
        asyncHandler(async (req, res) => {
            await User.create(user).then(async (user) => {
                await Account.create({
                    accountNumber: "970460" + (Math.floor(Math.random() * 10000000000) + 1), // Fixed
                    balance: 100000,
                    currencyUnit: "VND",
                    role: "user",
                    status: "UNVERIFIED", // 'UNVERIFIED' || 'LOCKED' || 'PENDING' || 'ACTIVE' || 'DENIED'
                    limit: 20000000,
                    openDate: user.createdAt,
                    userId: user.id,
                }).catch((err) => {
                    console.err(err);
                });
            });

            // await Email.send(user.email,'Mã kích hoạt tài khoản',`link activate của bạn là : ${process.env.BASE_URL}/login/${user.id}/${user.token}`)
            res.redirect("/");
        })
    );

module.exports = router;
