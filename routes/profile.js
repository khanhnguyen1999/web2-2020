const router = require("express").Router();
const User = require("../services/user");
const Account = require("../services/account");
const Transaction = require("../services/transaction");
const Op = require("sequelize").Op;

var role = "user";

router
    .route("/:id")
    .get(
        async (req, res, next) => {
            // Set role
            const currentAccount = res.locals.account.dataValues;
            role = currentAccount.role;

            // Check user role
            if (role === "admin") {
                return next();
            }

            // Get user's data
            const currentUser = res.locals.currentUser.dataValues;
            // Hide hashed password
            currentUser.password = "**********";

            // Combine user info w/ account info
            const thisUser = { ...currentAccount, ...currentUser };

            // Get user's transactions
            const transactions = await Transaction.findAll(
                {},
                {
                    where: {
                        [Op.or]: [
                            {
                                accountNumber: thisUser.accountNumber,
                            },
                            {
                                beneficiaryAccount: thisUser.accountNumber,
                            },
                        ],
                    },
                }
            );

            return res.render("./ducbui/pages/profiles/profile", { user: thisUser, transactions });
        },
        async (req, res, next) => {
            const { id } = req.params;

            const { dataValues } = await User.findById(id);
            // const account = await Account.findByUserId(id);
            console.log(dataValues);

            const user = {
                displayName: "ADMIN",
                password: "abc",
                username: "daniel29",
                accountNumber: "9704601241235701",
                cardId: "123123123",
                status: "ACTIVE",
            };

            return res.render("./ducbui/pages/profiles/profile", { user });
        }
    )
    .post(async (req, res, next) => {});

module.exports = router;
