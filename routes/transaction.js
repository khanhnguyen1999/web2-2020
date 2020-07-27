const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const User = require("../services/user");
const Account = require("../services/account");
const Transaction = require("../services/transaction");
const Bank = require("../services/bank");
const SavingAccount = require("../services/saving_account");
const BeneficiaryAccount = require("../services/beneficiaryAccount");
const crypto = require("crypto");
const Email = require("../services/email");

var token;
var fee;
var listBank;
var totalMoney;
var extraMoney;
var confirmInfo;
var binRoot = process.env.BIN || 9704;

router
    .route("/")
    .get(
        asyncHandler(async (req, res) => {
            listBank = await Bank.findAll();
            return res.render("./pages/transactions/transaction", { errors: null, listBank });
        })
    )
    .post(
        [
            body("amount").custom(async function (amount, { req }) {
                if (req.body.beneficiaryAccountNumber) {
                    if (amount < 100000) {
                        throw Error("Số tiền tối thiểu 100000 VND");
                    }
                    if (!amount || amount === "") {
                        throw Error("Chua nhap so tien gui");
                    }
                    const { bin, beneficiaryAccountNumber } = req.body;
                    const beneficiaryBin = beneficiaryAccountNumber.substr(0, 4);
                    const bank = await Bank.findByBin(bin);
                    const account = await Account.findByAccountNumber(req.session.account.accountNumber);

                    // Cung ngan hang
                    if (bin === beneficiaryBin) {
                        fee = bank.internalFee;
                    } // Khac ngan hang
                    else {
                        fee = bank.externalFee;
                    }

                    totalMoney = parseInt(amount) + parseInt(parseInt(amount) * fee);
                    extraMoney = parseInt(account.balance) - parseInt(totalMoney);

                    if (extraMoney < 100000) {
                        throw Error("Số dư không đủ");
                    }
                    return true;
                }
            }),
            body("beneficiaryAccountNumber").custom(async function (beneficiaryAccountNumber) {
                if (!beneficiaryAccountNumber) {
                    throw Error("Chua nhap STK nguoi gui");
                } else {
                    const account = await Account.findByAccountNumber(beneficiaryAccountNumber);
                    // const beneficiatAccount = await BeneficiatyAccount.findByAccountNumber(beneficiaryAccountNumber);
                    if (!account && !beneficiatAccount) {
                        throw Error("Số tài khoản không tồn tại");
                    }
                    // API here
                }

                return true;
            }),
        ],
        asyncHandler(async (req, res) => {
            const errors = validationResult(req);
            console.log(errors.errors);
            if (!errors.isEmpty() && req.body.bin) {
                return res.status(422).render("./pages/transactions/transaction", { errors: errors.errors, listBank });
            }

            const today = new Date();
            const hour = ("0" + today.getHours()).slice(-2);
            const min = ("0" + today.getMinutes()).slice(-2);
            const sec = ("0" + today.getSeconds()).slice(-2);
            const date = ("0" + today.getDate()).slice(-2);
            const mon = ("0" + (today.getMonth() + 1)).slice(-2);
            const transactionID = "" + date + mon + hour + min + sec + crypto.randomBytes(3).toString("hex").toUpperCase();

            if (!req.body.beneficiaryAccountNumber && !req.body.bin) {
                const { OTP } = req.body;
                const bank = await Bank.findByBin(confirmInfo.bin);
                console.log(confirmInfo);
                console.log(transactionID);
                console.log(res.locals.account.accountNumber);
                if (OTP.toUpperCase() === token) {
                    const beneficiaryInfo = await Transaction.create({
                        transactionID,
                        accountNumber: res.locals.account.accountNumber,
                        amount: confirmInfo.amount,
                        content: confirmInfo.content,
                        beneficiaryAccount: confirmInfo.beneficiaryAccountNumber,
                        fee: parseInt(confirmInfo.totalFee),
                    })
                        .then(async (trans) => {
                            // Current account: New Balance
                            await Account.findOne({
                                where: {
                                    accountNumber: res.locals.account.accountNumber,
                                },
                            })
                                .then(async (account) => {
                                    const newBalance = account.balance - totalMoney;
                                    console.log("new" + newBalance);
                                    await Account.updateBalance(newBalance, account.accountNumber);

                                    // Beneficiary account: New Balance
                                    await Account.findOne({
                                        where: {
                                            accountNumber: trans.beneficiaryAccount,
                                        },
                                    })
                                        .then(async (account) => {
                                            const newBalance = account.balance + parseInt(confirmInfo.amount);

                                            await Account.updateBalance(newBalance, account.accountNumber);
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        });
                                })
                                .catch((err) => {
                                    console.log(err);
                                });

                            const account = await Account.findOne({
                                where: {
                                    accountNumber: trans.beneficiaryAccount,
                                },
                            }).then(async (account) => {
                                const user = await User.findOne({
                                    where: {
                                        id: account.userId,
                                    },
                                })
                                    .then(async (user) => {
                                        await BeneficiaryAccount.create({
                                            displayName: user.displayName,
                                            beneficiaryBank: bank.bankName,
                                            pendingAmount: confirmInfo.amount,
                                        });

                                        return user;
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });

                                return user;
                            });

                            return { account, trans };
                        })
                        .catch((err) => {
                            console.log(err);
                        });

                    return res.render(
                        "./pages/transactions/result"
                        // , { errors: "Token không chính xác", confirmInfo }
                    );
                } else {
                    console.log("---------------------");
                    return res.render("./pages/transactions/verify", { errors: "OTP wrong", confirmInfo });
                }
            } else {
                console.log("---------------------qweq");
                const { bin, beneficiaryAccountNumber, amount, content } = req.body;
                const totalFee = parseInt(amount) * fee;

                if (Number(bin) === binRoot) {
                    const account = await Account.findOne({
                        where: {
                            accountNumber: beneficiaryAccountNumber,
                        },
                    })
                        .then(async (account) => {
                            return await User.findById(account.userId);
                        })
                        .catch((err) => {
                            console.log(err);
                        });

                    confirmInfo = {
                        beneficiaryAccountNumber,
                        amount,
                        content,
                        totalFee,
                        displayName: account.displayName,
                        bin,
                    };

                    res.locals.confirmInfo = confirmInfo;

                    token = crypto.randomBytes(2).toString("hex").toUpperCase();
                    console.log(token);
                    // await Email.send(res.locals.currentUser.email, "Transaction Confirmation", token);
                    return res.render("./pages/transactions/verify", { errors: null, confirmInfo });
                } else {
                    return res.render("./pages/transactions/transaction", { errors: errors.errors, listBank: listBank });
                }
            }
        })
    );

module.exports = router;
