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
            body("data.displayName").trim().notEmpty(),
            body("data.username").trim().notEmpty()
            .custom(async (username)=>{
                const found = await User.findByUsername(username);
                if (found) {
                    throw Error("Username exists");
                }
                return true;
            }), // Need Handle
            body("data.email")
                .isEmail()
                .normalizeEmail()
                .custom(async function (email) {
                    const found = await User.findByEmail(email);
                    if (found) {
                        throw Error("User exists");
                    }
                    return true;
                }),
            body("data.password").isLength({ min: 6 }).notEmpty(),
            body("data.confirmPassword").isLength({ min: 6 }).notEmpty()
            .custom(async(confirmPassword,{req})=>{
                const {password } = req.body.data;
                console.log(password + "   "+confirmPassword)
                console.log(typeof password + "   "+ typeof confirmPassword)
                if(password!==confirmPassword)
                {
                    console.log("khac cc")
                    throw Error("Confirm password not match")
                }
                return true;
            }),
        ],
        async (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                console.log(errors)
                return res.json({success : false , errors : errors.array() })
            }

            const { displayName, username, email, password, confirmPassword } = req.body.data;
            user = {
                displayName,
                username,
                email,
                password: User.hashPassword(password),
            };
            res.json({success:true})
            return next();
        },
        asyncHandler(async (req, res) => {
            await User.create(user).then(async (user) => {
                await Account.create({
                    accountNumber: "970460" + (Math.floor(Math.random() * 10000000000) + 1), // Fixed
                    balance: 0,
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
        })
    );

module.exports = router;
