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
var interestRate;
var userSavingAccount;
var opendatesaving=undefined;
var closedatesaving=undefined;
// var BeneficiaryDisplayname;
// var BeneficiaryNumberAccount;
// var BeneficiaryBalance;
// var content ;
var ran;
var token;
var SoTien;
var fund;
var digits;
var depositTerm;
var formInterest;
var subEmail;
var now;
// var fee;

// var totalMoney;
// var extraMoney;
// var beneficiaryExtraMoney;
// var listBank;
// const bankRoot="Vietcombank"


function inWords (num) {
    var a = ['','Một ','Hai ','Ba ','Bốn ', 'Năm ','Sáu ','Bảy ','Tám ','Chín ','Mười ','Mười Một ','Mười Hai ','Mười Ba ','Mười Bốn ','Mười Lăm ','Mười sáu ','Mười Bảy ','Mười Tám ','Mười Chín '];
    var b = ['', '', 'Hai Mươi','Ba Mươi','Bốn Mươi','Năm Mươi', 'Sáu Mươi','Bảy Mươi','Tám Mươi','Chín Mươi'];
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{1})(\d{2})(\d{1})(\d{2})(\d{1})(\d{2})$/);
    console.log(n)
    if (!n) return; var str = '';
    
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Trăm ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Triệu ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[2][0]] + ' ' + a[n[3][1]]) + 'Trăm ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[3][0]] + ' ' + a[n[4][1]]) + 'Nghìn ' : '';
    str += (n[5] != 0) ? (a[Number(n[5])] || b[n[4][0]] + ' ' + a[n[5][1]]) + 'Trăm ' : '';
    str += (n[6] != 0) ? ((str != '') ? '' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Đồng' : '';
    return str;
}
function dateTimeToDate(today,species)
{
    var sc = String(todaygetSeconds()).padStart(2, '0');
    var m  = String(today.getMinutes()).padStart(2, '0');
    var h  = String(today.getHours()).padStart(2, '0');
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    var date = mm + '/' + dd + '/' + yyyy;
    var datetime = mm + '/' + dd + '/' + yyyy +"   "+h+":"+m+":"+sc;
    if(species==0)
    {
        return date;
    }
    if(species==1)
    {
        return datetime;
    }
    return datetime;
}

router.get('/',async (req,res)=>{
    console.log(req.session.account)
    userSavingAccount = await SavingAccount.findSavingAccountrByAccountNumber(req.session.account.accountNumber)
    var dateNow = new Date();
    fund = userSavingAccount?userSavingAccount.fund:0;
    if(userSavingAccount)
    {
        
        // opendatesaving = dateTimeToDate(userSavingAccount.openDate,0); 
        // closedatesaving = dateTimeToDate(userSavingAccount.closeDate,0);
        return res.render('./pages/savingAccount/listSaving',{fund:fund,saving:userSavingAccount,errors:null});
    }
    else
    {
        return res.render('./pages/savingAccount/savingAccount',{fund:fund,errors:null}); 
    }
    // account =await Account.findAccountrByAccountNumber(res.locals.account.accountNumber);
    return res.render('./pages/savingAccount/savingAccount',{fund:fund,errors:null});  
});
router.get("/saving/:id",asyncHandler(async function postLogin(req,res){
        const {id}=req.params;
        const itemSaving = await SavingAccount.findSavingAccountrById(id);
        res.render('./pages/savingAccount/saving',{fund:fund,saving:itemSaving,errors:null});
}))
router.post('/',[
    body('amountSaving')
        .custom(async function(SoTienBody,{req}){
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
        }),
        
] ,asyncHandler(async function(req,res){
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('./pages/savingAccount/savingAccount',{fund:fund,errors :errors.errors});
    }
    digits = inWords(parseInt(req.body.amountSaving))
    var today = dateTimeToDate(new Date(),0)
    now = dateTimeToDate(new Date(),1)
    const d = new Date();
    ran = crypto.randomBytes(3).toString('hex').toUpperCase() +  ('0' + d.getMinutes()).slice(-2) +  ('0' + d.getSeconds()).slice(-2) +  ('0' + d.getMonth() + 1).slice(-2)
   if(!req.body.amountSaving)
   {
        console.log("---------------------")
        if(req.body.OTP.toUpperCase()==token)
        {   
            const extraMoney = account.balance - SoTien;
            await Account.updateBalance(extraMoney,res.locals.account.accountNumber);
            var dt = new Date(yyyy,mm,dd,h,m,sc,"00")
            var closeDate = new Date(dt.setMonth(dt.getMonth()+depositTerm-1))
            const svAccount = await SavingAccount.create({
                fund:SoTien,
                interest: 0,
                depositTerm: depositTerm,
                interestRate:interestRate,
                openDate:today,
                closeDate:closeDate,
                accountAccountNumber:req.session.account.accountNumber,
            })
            res.render('./pages/savingAccount/savingAccount2')
        }
        else
        {
            return res.render('./pages/savingAccount/savingAccount1',{
                errors:"Token không chính xác",
                account:account,
                SoTien:SoTien,
                digits:digits,
                depositTerm:depositTerm,
                interestRate:interestRate,
                now:now,
                ran:ran,
                email:subEmail,
                formInterest:formInterest,
            }); 
        }
  
   }
   else
   {
        console.log("-------------------co vao")
        switch(req.body.depositTerm)
        {
            case "1":
                interestRate = 4.5;
                depositTerm = 1;
                break;
            case "3":
                interestRate = 5;
                depositTerm = 3;
                break;
            case "6":
                interestRate = 5.5;
                depositTerm = 6;
                break;
            case "9":
                interestRate = 5.5;
                depositTerm = 9;
                break;
            case "12":
                interestRate = 6.8;
                depositTerm = 12;
                break;
            case "24":
                interestRate = 6.8;
                depositTerm = 24;
                break;
            default:
                interestRate = 0;
                depositTerm = 0;
                break;
        }

        var userEmail = req.session.currentUser.email;
        formInterest = req.body.HinhThuc;
        SoTien= parseInt(req.body.amountSaving);
        var lengthEmail = userEmail.length;
        subEmail = userEmail.substring(0,6)+"****"+ userEmail.substring(lengthEmail-11,lengthEmail)
        token = crypto.randomBytes(2).toString("hex").toUpperCase(); res.locals.token = token;
        Email.send(res.locals.currentUser.email,"Vietcombank","Mã xác thực TKTK : "+token)
        return res.render('./pages/savingAccount/savingAccount1',{
            errors:undefined,
            account:account,
            SoTien:SoTien,
            digits:digits,
            depositTerm:depositTerm,
            interestRate:interestRate,
            now:now,
            ran:ran,
            email:subEmail,
            formInterest:formInterest,
        });  
        
    }
}));
module.exports = router;