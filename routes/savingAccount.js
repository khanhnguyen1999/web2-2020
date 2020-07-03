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

var account ;
var interest;
// var BeneficiaryDisplayname;
// var BeneficiaryNumberAccount;
// var BeneficiaryBalance;
// var content ;
var token;
var SoTien;
var depositTerm;
var formInterest;
// var fee;

// var totalMoney;
// var extraMoney;
// var beneficiaryExtraMoney;
// var listBank;
// const bankRoot="Vietcombank"
router.get('/',async (req,res)=>{
    console.log(req.session.account)
    // account =await Account.findAccountrByAccountNumber(res.locals.account.accountNumber);
    return res.render('./pages/savingAccount/savingAccount',{errors:null});  
});

router.post('/',[
    body('amountSaving')
        .custom(async function(SoTienBody,{req}){
            console.log("----------------------cccc")
            account = await Account.findAccountrByUserId(req.session.currentUser.id);
            console.log(typeof SoTienBody)
            console.log(typeof account.balance)
            if((parseInt(SoTienBody)+50000)>account.balance)
            {
                throw Error('Số tiền không đủ');
            }
            if(SoTienBody=="")
            {
                throw Error('Số tiền không hợp lệ');
            }
            return true

            

            // if(req.body.STKHuongThu)
            // {
            //     if(SoTienBody<3000000){
            //         throw Error('Số tiền tối thiểu 3.000.000 VND');
            //     }
            //     if(res.locals.account)
            //     depositTerm = req.body.depositTerm;
                
            //     if(extraMoney<50000)
            //     {
            //         throw Error('Số dư không đủ');
            //     }
            //     return true;
            // }
        }),

    // body('STKHuongThu')
    //     .custom(async function(STKHuongThu){
    //         if(STKHuongThu=="")
    //         {
    //             throw Error('Số tài khoản không tồn tại');
    //         }
    //         if(!STKHuongThu)
    //         {
    //             return false;
    //         }
    //         else
    //         {
    //             const account = await Account.findAccountrByAccountNumber(STKHuongThu)
    //             const beneficiatAccount = await BeneficiatyAccount.findAccountrByAccountNumber(STKHuongThu)
    //             if(!account && !beneficiatAccount)
    //             {
    //                 throw Error('Số tài khoản không tồn tại');
    //             }
    
    //         }
           
    //         return true;
    //     }),
 
        
] ,asyncHandler(async function(req,res){
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('./pages/savingAccount/savingAccount',{errors :errors.errors});
    }
   
   if(!req.body.amountSaving)
   {
       console.log("---------------------")
    //    if(req.body.OTP.toUpperCase()==token)
    //    {       
    //         console.log("-------------------1" + NganHang) 
    //         await Account.updateBalance(extraMoney,res.locals.account.accountNumber);
    //         if(NganHang != bankRoot) // khac ngan hang
    //         {
    //             console.log(beneficiaryExtraMoney)
    //             await BeneficiatyAccount.updateBalance(beneficiaryExtraMoney,BeneficiaryNumberAccount);
    //         }
    //         else
    //         {
    //             console.log("-------------------2"+beneficiaryExtraMoney,BeneficiaryNumberAccount)  
    //             await Account.updateBalance(beneficiaryExtraMoney,BeneficiaryNumberAccount);
    //         }  
    //         console.log("-------------------2")        
    //         await Email.send('chi1caithoi@gmail.com','Vietcombank',account.accountNumber+" "+res.locals.currentUser.displayName+" tới "+
    //         BeneficiaryNumberAccount+" "+BeneficiaryDisplayname +" : "+SoTien +"\nSố dư : "+extraMoney )
    //         console.log("-------------------3")  
    //         const transaction = await Transaction.create({
    //             accountNumber:res.locals.account.accountNumber,
    //             amount: SoTien,
    //             content:content,
    //             beneficiaryBank:NganHang,
    //             beneficiaryAccount :  BeneficiaryNumberAccount
    
    //         })
    //         res.render('./pages/transactions/transaction2')
    //    }
    //    else
    //    {
          
             
    //          return res.render('./pages/transactions/transaction1',{
    //             errors:"Token không chính xác",
    //             BeneficiaryDisplayname:BeneficiaryDisplayname,
    //             BeneficiaryNumberAccount:BeneficiaryNumberAccount,
    //             account:account,
    //             SoTien:req.body.SoTien,
    //             content:content,
    //             fee:fee,
    //         }); 
    //    }
  
   }
   else
   {
        console.log("-------------------co vao")
        switch(req.body.depositTerm)
        {
            case "1":
                interest = 4.5;
                break;
            case "3":
                interest = 5;
                break;
            case "6":
                interest = 5.5;
                break;
            case "9":
                interest = 5.5;
                break;
            case "12":
                interest = 6.8;
                break;
            case "24":
                interest = 6.8;
                break;
            default:
                interest = 0;
                break;
        }

        var userEmail = req.session.currentUser.email;
        formInterest = req.body.HinhThuc;
        SoTien= parseInt(req.body.amountSaving);
        depositTerm = req.body.depositTerm;
        var lengthEmail = userEmail.length;
        var subEmail = userEmail.substring(0,6)+"****"+ userEmail.substring(lengthEmail-11,lengthEmail)
        token = crypto.randomBytes(2).toString("hex").toUpperCase(); res.locals.token = token;
        Email.send(res.locals.currentUser.email,"Vietcombank","Mã xác thực TKTK : "+token)
        return res.render('./pages/savingAccount/savingAccount1',{
            errors:undefined,
            account:account,
            SoTien:SoTien,
            depositTerm:depositTerm,
            interest:interest,
            email:subEmail,
            formInterest:formInterest,
        });  
        
    }
}));
module.exports = router;