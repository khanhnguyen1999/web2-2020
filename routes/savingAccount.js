const {Router} =require('express');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler')
const router = new Router();
const db = require('../services/db')
const User = require('../services/user');
const Account = require('../services/account');
const SavingAccount = require('../services/saving_account');
const Transaction = require('../services/transaction');
const Bank = require('../services/bank');
const BeneficiatyAccount= require('../services/beneficiaryAccount');
const Email = require('../services/email');
// const { tableName } = require('../services/user');
const crypto = require('crypto');
// const { INTEGER } = require('sequelize/types');
const Sequelize = require('sequelize')

// var account ;
// var BeneficiaryDisplayname;
// var BeneficiaryNumberAccount;
// var BeneficiaryBalance;
// var content ;
// var token;
// var SoTien;
// var NganHang;
// var fee;

// var totalMoney;
// var extraMoney;
// var beneficiaryExtraMoney;
// var listBank;
// const bankRoot="Vietcombank"
router.get('/',async (req,res)=>{
    // account =await Account.findAccountrByAccountNumber(res.locals.account.accountNumber);
    return res.render('./pages/savingAccount/savingAccount');  
});
module.exports =router;