const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const db = require('../services/db');
const User = require('../services/user');
const Account = require('../services/account');
const SavingAccount = require('../services/saving_account');
const Transaction = require('../services/transaction');
const Bank = require('../services/bank');
const Email = require('../services/email');
const crypto = require('crypto');

var account;
var _beneficiaryAccount;
var content;
var token;
var amount;
var totalMoney;
var extraMoney;
var beneficiaryExtraMoney;

router.get('/', async (req, res) => {
    const listBank = await Bank.AllBank();
    return res.render('./pages/transactions/transaction', { listBank: listBank });
});

router.post('/', [
    body('amount')
        .custom(async function (amount) {
            if (amount < 50) {
                throw Error('currentUser exists');
            }
            return true;
        }),
    body('STKHuongThu')
        .custom(async function (STKHuongThu) {
            if (!STKHuongThu) {
                return false;
            } else {
                const account = Account.findAccountrByAccountNumber(STKHuongThu);
                if (!account) {
                    throw Error('AccountNumber exists');
                }
            }
            return true;
        }),
], asyncHandler(async function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log("Error");
        return res.status(422).render('./pages/transactions/transaction', { errors: errors.array() });
    }

    if (!req.body.STKHuongThu) {
        console.log(token)
        if (req.body.OTP.toUpperCase() == token) {
            await Account.updateBalance(extraMoney, res.locals.account.accountNumber);
            await Account.updateBalance(beneficiaryExtraMoney, _beneficiaryAccount.accountNumber);
            await Email.send('chi1caithoi@gmail.com', 'Vietcombank', account.accountNumber + " " + res.locals.currentUser.displayName + " tới " +
                _beneficiaryAccount.accountNumber + " " + BeneficiaryUser.displayName + " : " + req.body.amount + "\nSố dư : " + extraMoney);
            res.render('./pages/transactions/transaction2');
        } else {
            throw Error('token khong chinh xac');
        }
    } else {
        account = await Account.findAccountrByAccountNumber(res.locals.account.accountNumber);
        _beneficiaryAccount = await Account.findAccountrByAccountNumber(req.body.STKHuongThu);
        BeneficiaryUser = await User.findUserById(_beneficiaryAccount.userId);
        content = req.body.NoiDung == '' ? account.accountNumber + " " + res.locals.currentUser.displayName + " tới " +
            _beneficiaryAccount.accountNumber + " " + BeneficiaryUser.displayName + " " : req.body.NoiDung;

        await Transaction.create({
            accountNumber: res.locals.account.accountNumber,
            amount: req.body.amount,
            content: content,
            beneficiaryBank: req.body.NganHang,
            beneficiaryAccount: req.body.STKHuongThu
        });

        amount = req.body.amount;
        totalMoney = parseInt(req.body.amount) + 5000;
        extraMoney = parseInt(account.balance) - totalMoney;
        beneficiaryExtraMoney = parseInt(_beneficiaryAccount.balance) + parseInt(req.body.amount);
        token = crypto.randomBytes(2).toString("hex").toUpperCase(); res.locals.token = token;

        if (extraMoney < 50000) {
            throw Error('khong du tien');
        } else {
            // await Account.updateBalance(extraMoney,res.locals.account.accountNumber);
            // await Account.updateBalance(beneficiaryExtraMoney,req.body.STKHuongThu)
            // await Email.send('chi1caithoi@gmail.com','Vietcombank',account.accountNumber+" "+res.locals.currentUser.displayName+" tới "+
            // _beneficiaryAccount.accountNumber+" "+BeneficiaryUser.displayName +" : "+req.body.amount +"\nSố dư : "+extraMoney )
            Email.send(res.locals.currentUser.email, "Vietcombank", token);

            return res.render('./pages/transactions/transaction1', {
                _beneficiaryAccount: _beneficiaryAccount,
                BeneficiaryUser: BeneficiaryUser,
                account: account,
                amount: req.body.amount,
                content: content,
            });
        }
    }


    // console.log(res.locals.account.accountNumber)
    // await User.create({

    //     email:'email3@gmail.com',
    //     username:'nguyen van c',
    //     password:'$2b$10$RJaT94d1LWSIUH.fbhdrTuZ1Iv1Xw3a/8ZqgSiSuF4uhluqlYX.vC',
    //     displayName : 'khaidang2',
    //     idCardType:'33',
    //     cardId : '1234567',
    //     provideDate:'2016-08-09 04:05:02',
    // })
    // await Account.create({
    //     accountNumber : '1234567',
    //     balance : 5000000,
    //     currencyUnit:'currencyUnit',
    //     status:true,
    //     openDate:'2016-08-09 04:05:02',
    //     limit:5000000
    // })
    // const currentUser = await User.create({
    //     email: req.body.email,
    //     displayName: req.body.displayName,
    //     password: (await User.hashPassword(req.body.password)).toString(),
    //     token : crypto.randomBytes(3).toString('hex').toUpperCase(),

    // })
    // req.session.userId = currentUser.id
    // await Email.send(currentUser.email, 'kich hoat tai khoan' ,`${process.env.BASE_URL}/login/activate/${currentUser.id}/${currentUser.token}`);
    // res.redirect('/')
}));

module.exports = router;