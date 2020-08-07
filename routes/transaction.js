const { Router } = require('express');
const { body, check,validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler')
const router = new Router();
const db = require('../services/db')
const User = require('../services/user');
const Account = require('../services/account');
const SavingAccount = require('../services/saving_account');
const Transaction = require('../services/transaction');
const Bank = require('../services/bank');
const BeneficiatyAccount = require('../services/beneficiaryAccount');
const Email = require('../services/email');
// const { tableName } = require('../services/user');
const crypto = require('crypto');
// const { INTEGER } = require('sequelize/types');
const Sequelize = require('sequelize')
const axios = require('axios');
const { json } = require('body-parser');
const UserStatus = require("../middlewares/userStatus");

var token;
var fee;
var listBank;
var totalMoney;
var extraMoney;
var binRoot = process.env.BIN || 9704;

// router.use(UserStatus);

router.route('/')
    .get(asyncHandler(async (req, res) => {
        listBank = await Bank.findAll();
        console.log(listBank);
        console.log(req.body)
        console.log(req.data)
        console.log("--------"+req)
        // let account = await Account.findByUserId(req,)
        return res.status(200);
    }))
    .post([
        body('amount')
            .custom(async function (amount, { req }) {
                if (req.body.beneficiaryAccountNumber) {
                    if (amount < 100000) {
                        throw Error('Số tiền tối thiểu 100000 VND');
                    }
                    const { bin, beneficiaryAccountNumber } = req.body;
                    const beneficiaryBin = beneficiaryAccountNumber.substr(0, 4);
                    const bank = await Bank.findByBin(bin);
                    const account = await Account.findByAccountNumber(req.session.account.accountNumber);

                    // Cung ngan hang
                    if (bin === beneficiaryBin) {
                        fee = bank.internalFee;
                    }
                    else // Khac ngan hang
                    {
                        fee = bank.externalFee;
                    }

                    totalMoney = parseInt(amount) + parseInt((parseInt(amount) * fee));
                    extraMoney = parseInt(account.balance) - parseInt(totalMoney);

                    if (extraMoney < 100000) {
                        throw Error('Số dư không đủ');
                    }
                    return true;
                }
            }),
        body('beneficiaryAccountNumber')
            .notEmpty()
            .custom(async function (beneficiaryAccountNumber) {
                if (!beneficiaryAccountNumber) {
                    return false;
                } else {
                    const account = await Account.findByAccountNumber(beneficiaryAccountNumber);
                    // const beneficiatAccount = await BeneficiatyAccount.findByAccountNumber(beneficiaryAccountNumber);
                    // if (!account && !beneficiatAccount) {
                    //     throw Error('Số tài khoản không tồn tại');
                    // }
                    // API here
                }

                return true;
            }),
    ], asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).render('./pages/transactions/transaction', { errors: errors.errors, listBank });
        }

        const { bin, beneficiaryAccountNumber, amount, content } = req.body;

        const bank = await Bank.findByBin(bin);

        if (Number(bin) === binRoot) {
            const beneficiaryAccount = await Transaction.create({
                transactionID: 'test',
                accountNumber: res.locals.account.accountNumber,
                amount,
                content,
                beneficiaryAccount: beneficiaryAccountNumber,
                fee,
            }).then(async (trans) => {
                const account = await Account.findOne(
                    {
                        where: {
                            beneficiaryAccount: trans.beneficiaryAccount,
                        }
                    }).then(async (account) => {
                        const user = await User.findById(account.userId);
                        return user;
                    });
                return account;
            }).catch((err) => {
                console.log(err);
                console.log(`>> Error: ${err.beneficiaryAccount}`); 
            });
        }
    }));
router.post('/getInformation',async(req,res)=>{
    let listBank = await Bank.findAll();
    const {userId}  = req.body;
    let account = await Account.findByUserId(userId)
    res.status(200).json({account,listBank})
})
router.post('/postInformation',[
    check('data.amount')
        .custom(async function (amount, { req }) {
            if (req.body.data.beneficiaryAccountNumber) {
                if (parseInt(amount) < 100000) {
                    throw Error('Số tiền tối thiểu 100000 VND');
                }
                const { binBank, beneficiaryAccountNumber } = req.body.data;
                const beneficiaryBin = beneficiaryAccountNumber.substr(0, 4);
                const bank = await Bank.findByBin(binBank);
                const account = await Account.findByAccountNumber(req.body.data.account.accountNumber);
                if(!bank || !account)
                {
                    throw Error('khong tim thay ngan hang');
                }
                else
                {
                     // Cung ngan hang
                    if (binBank === beneficiaryBin) {
                        fee = bank.internalFee;
                    }
                    else // Khac ngan hang
                    {
                        fee = bank.externalFee;
                    }

                    totalMoney = parseInt(amount) + parseInt((parseInt(amount) * fee));
                    extraMoney = parseInt(account.balance) - parseInt(totalMoney);

                    if (extraMoney < 100000) {
                        throw Error('Số dư không đủ');
                    }
                    return true;
                }
            }
        }),
    check('data.beneficiaryAccountNumber')
        .notEmpty()
        .custom(async function (beneficiaryAccountNumber) {
            
            if (!beneficiaryAccountNumber) {
                return false;
            } else {
                const account = await Account.findByAccountNumber(beneficiaryAccountNumber);
                 if (!account) {
                    throw Error('Số tài khoản không tồn tại');
                }
                // const beneficiatAccount = await BeneficiatyAccount.findByAccountNumber(beneficiaryAccountNumber);
                // if (!account && !beneficiatAccount) {
                //     throw Error('Số tài khoản không tồn tại');
                // }
                // API here
            }
            return true;
        }),
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(200).json({success:false , errors})
    }

    const { binBank, beneficiaryAccountNumber, amount, content ,user } = req.body.data;
    
    const totalFee = parseInt(amount) * fee;

    if (Number(binBank) === binRoot) {
        const account = await Account.findOne({
            where: {
                accountNumber: beneficiaryAccountNumber,
            }
        }).then(async (account) => {
            return await User.findById(account.userId);
        }).catch((err) => {
            console.log(err);
        });
        // res.locals.confirmInfo = confirmInfo;
        token = crypto.randomBytes(2).toString("hex").toUpperCase();
        confirmInfo = {
            beneficiaryAccountNumber,
            amount,
            content,
            totalFee,
            displayName: account.displayName,
            bin:binBank,
            token,
        }
        await Email.send(user.email, "Transaction Confirmation", token);
        console.log(token)
        return res.status(200).json({success:true,confirmInfo})
    }

})

router.post('/verify',async(req,res)=>{
    const {accountNumber, binBank, beneficiaryAccountNumber, amount, content,totalFee } = req.body.data;
    console.log("sdasd"+req.body.data)
    const today = new Date();
    const hour = ('0' + today.getHours()).slice(-2);
    const min = ('0' + today.getMinutes()).slice(-2);
    const sec = ('0' + today.getSeconds()).slice(-2);
    const date = ('0' + today.getDate()).slice(-2);
    const mon = ('0' + (today.getMonth() + 1)).slice(-2);
    const transactionID = "" + date + mon + hour + min + sec + crypto.randomBytes(3).toString('hex').toUpperCase();

        const beneficiaryInfo = await Transaction.create({
            transactionID,
            accountNumber: accountNumber,
            amount: amount,
            content: content,
            beneficiaryAccount: beneficiaryAccountNumber,
            fee: parseInt(totalFee),
        }).then(async (trans) => {
            // Current account: New Balance
            await Account.findOne({
                where: {
                    accountNumber: accountNumber,
                }
            }).then(async (account) => {
                const newBalance = account.balance - totalMoney;

                // account: New Balance
                await Account.updateBalance(newBalance, accountNumber);

                // Beneficiary account: New Balance
                await Account.findOne({
                    where: {
                        accountNumber: trans.beneficiaryAccount,
                    }
                }).then(async (account) => {
                    const newBalance = account.balance + parseInt(amount);

                    await Account.updateBalance(newBalance, account.accountNumber);
                }).catch((err) => {
                    console.log(err);
                });
                console.log("accccc")
                console.log(account)
            }).catch((err) => {
                console.log(err);
            });

        
        }).catch((err) => {
            console.log(err);
        });
        

    return res.status(200).json({success:true})
});


// router.get('/', async (req, res) => {
//     listBank = await Bank.AllBank();
//     account = await Account.findByAccountNumber(res.locals.account.accountNumber);
//     return res.render('./pages/transactions/transaction', { errors: null, listBank: listBank });
// });

// router.post('/', [
//     body('amount')
//         .custom(async function (amount, { req }) {
//             if (req.body.beneficiaryAccountNumber) {
//                 if (amount < 100000) {
//                     throw Error('Số tiền tối thiểu 100000 VND');
//                 }
//                 const { bin, beneficiaryAccountNumber } = req.body;
//                 const beneficiaryBin = beneficiaryAccountNumber.substr(0, 4);
//                 const bank = await Bank.findByBin(bin);
//                 const account = await Account.findByAccountNumber(res.locals.accountNumber);

//                 // Cung ngan hang
//                 if (bin === beneficiaryBin) {
//                     fee = bank.internalFee;
//                 }
//                 else // Khac ngan hang
//                 {
//                     fee = bank.externalFee;
//                 }

//                 totalMoney = parseInt(amount) + parseInt((parseInt(amount) * fee));
//                 extraMoney = parseInt(account.balance) - parseInt(totalMoney);

//                 if (extraMoney < 100000) {
//                     throw Error('Số dư không đủ');
//                 }
//                 return true;
//             }
//         }),
//     body('beneficiaryAccountNumber')
//         .notEmpty()
//         .custom(async function (beneficiaryAccountNumber) {
//             if (!beneficiaryAccountNumber) {
//                 return false;
//             } else {
//                 const account = await Account.findByAccountNumber(beneficiaryAccountNumber);
//                 // const beneficiatAccount = await BeneficiatyAccount.findByAccountNumber(beneficiaryAccountNumber);
//                 // if (!account && !beneficiatAccount) {
//                 //     throw Error('Số tài khoản không tồn tại');
//                 // }
//                 // API here
//             }

//             return true;
//         }),
// ], asyncHandler(async function (req, res) {

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(422).render('./pages/transactions/transaction', { errors: errors.errors, listBank: listBank });
//     }

//     if (!req.body.beneficiaryAccountNumber) {
//         if (req.body.OTP.toUpperCase() == token) {
//             console.log("-------------------1" + bin)
//             await Account.updateBalance(extraMoney, res.locals.account.accountNumber);
//             if (bin != bankRoot) // khac ngan hang
//             {
//                 console.log(beneficiaryExtraMoney)
//                 await BeneficiatyAccount.updateBalance(beneficiaryExtraMoney, BeneficiaryNumberAccount);
//             }
//             else {
//                 console.log("-------------------2" + beneficiaryExtraMoney, BeneficiaryNumberAccount)
//                 await Account.updateBalance(beneficiaryExtraMoney, BeneficiaryNumberAccount);
//             }
//             console.log("-------------------2")
//             await Email.send(req.session.currentUser.email, 'Vietcombank', account.accountNumber + " " + res.locals.currentUser.displayName + " tới " +
//                 BeneficiaryNumberAccount + " " + BeneficiaryDisplayname + " : " + amount + "\nSố dư : " + extraMoney)
//             console.log("-------------------3")
//             const transaction = await Transaction.create({
//                 accountNumber: res.locals.account.accountNumber,
//                 amount: amount,
//                 content: content,
//                 beneficiaryBank: bin,
//                 beneficiaryAccountNumber: BeneficiaryNumberAccount

//             })
//             res.render('./pages/transactions/transaction2')
//         }
//         else {
//             return res.render('./pages/transactions/transaction1', {
//                 errors: "Token không chính xác",
//                 BeneficiaryDisplayname: BeneficiaryDisplayname,
//                 BeneficiaryNumberAccount: BeneficiaryNumberAccount,
//                 account: account,
//                 amount: req.body.amount,
//                 content: content,
//                 fee: fee,
//             });
//         }

//     }
//     else {
//         if (req.body.bin != bankRoot) //khac ngan hang
//         {
//             const BeneficiaryAccountFalse = await BeneficiatyAccount.findByAccountNumber(req.body.beneficiaryAccountNumber);
//             BeneficiaryNumberAccount = BeneficiaryAccountFalse.accountNumber;
//             BeneficiaryDisplayname = BeneficiaryAccountFalse.displayName;
//             BeneficiaryBalance = BeneficiaryAccountFalse.balance;

//             fee = parseInt(req.body.amount * 0.0003);
//             if (fee < 10000) {
//                 fee = 10000;
//             }

//         }
//         else   // cung ngan hang
//         {
//             fee = 5000;
//             const BeneficiaryAccountTrue = await Account.findByAccountNumber(req.body.beneficiaryAccountNumber);
//             const BeneficiaryUserTrue = await User.findById(BeneficiaryAccountTrue.userId)
//             BeneficiaryNumberAccount = BeneficiaryAccountTrue.accountNumber;
//             BeneficiaryDisplayname = BeneficiaryUserTrue.displayName;
//             BeneficiaryBalance = BeneficiaryAccountTrue.balance;
//         }


//         content = req.body.content == '' ? account.accountNumber + " " + res.locals.currentUser.displayName + " tới " +
//             BeneficiaryNumberAccount + " " + BeneficiaryDisplayname + " " : req.body.content;


//         amount = req.body.amount;
//         bin = req.body.bin;
//         // totalMoney = parseInt(req.body.amount) + fee;
//         // extraMoney = parseInt(account.balance) - totalMoney;
//         beneficiaryExtraMoney = parseInt(BeneficiaryBalance) + parseInt(req.body.amount)

//         token = crypto.randomBytes(2).toString("hex").toUpperCase(); res.locals.token = token;
//         if (extraMoney < 50000) {
//             throw Error('Số dư không đủ');
//         }
//         else {
//             console.log(extraMoney)
//             Email.send(res.locals.currentUser.email, "Vietcombank", token)
//             return res.render('./pages/transactions/verify', {
//                 errors: undefined,
//                 BeneficiaryDisplayname,
//                 BeneficiaryNumberAccount,
//                 account,
//                 amount: req.body.amount,
//                 content: content,
//                 fee: fee,
//             });
//         }
//     }


//     // console.log(res.locals.account.accountNumber)
//     // await User.create({

//     //     email:'email3@gmail.com',
//     //     username:'nguyen van c',
//     //     password:'$2b$10$RJaT94d1LWSIUH.fbhdrTuZ1Iv1Xw3a/8ZqgSiSuF4uhluqlYX.vC',
//     //     displayName : 'khaidang2',
//     //     idCardType:'33',
//     //     cardId : '1234567',
//     //     provideDate:'2016-08-09 04:05:02',
//     // })
//     // await Account.create({
//     //     accountNumber : '1234567',
//     //     balance : 5000000,
//     //     currencyUnit:'currencyUnit',
//     //     status:true,
//     //     openDate:'2016-08-09 04:05:02',
//     //     limit:5000000
//     // })
//     // const currentUser = await User.create({
//     //     email: req.body.email,
//     //     displayName: req.body.displayName,
//     //     password: (await User.hashPassword(req.body.password)).toString(),
//     //     token : crypto.randomBytes(3).toString('hex').toUpperCase(),

//     // })
//     // req.session.userId = currentUser.id
//     // await Email.send(currentUser.email, 'kich hoat tai khoan' ,`${process.env.BASE_URL}/login/activate/${currentUser.id}/${currentUser.token}`);
//     // res.redirect('/')
// }));
module.exports = router;