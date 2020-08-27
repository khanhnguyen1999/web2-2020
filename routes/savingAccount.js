const {Router} =require('express');
const {check, body, validationResult } = require('express-validator');
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
const crypto = require('crypto');
const Sequelize = require('sequelize');
const { DATE } = require('sequelize');
const { updateFund } = require('../services/saving_account');

const bank17ez= "Vietcombank";

var account ;
var interestRate;
var token;
var tokenTatToan;
var SoTien;
var digits;
var depositTerm;
var formInterest;
var now;
var subEmail
const inMoney = (num) => {
    var rs = String(num);
    const formatter = new Intl.NumberFormat('de-DE', {
        currency: 'VND',
        minimumFractionDigits: 0
    })
    rs = formatter.format(rs)
    return rs;
}
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
    var sc = String(today.getSeconds()).padStart(2, '0');
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
//lay thong tin 
router.post('/getInformation',async(req,res)=>{
    const {userId}  = req.body;
    let account = await Account.findByUserId(userId)
    let savingAccount = await SavingAccount.findSavingAccountrByAccountNumber(account.accountNumber)
    console.log("--dasd")
    console.log(savingAccount)
    res.status(200).json({account,savingAccount})
})
// ---------  tat toan ---------
//get tat toan
router.post('/onfinalization',async(req,res)=>{
    const {userId}  = req.body; 
    const user =await User.findById(userId);
    const token = crypto.randomBytes(2).toString("hex").toUpperCase();
    console.log(user)
    console.log(token)
    await Email.send(user.email, "Finalization Token", token);
    return res.status(200).json(token)
})
router.post('/onfinalization/verify',async(req,res)=>{
    const {data}  = req.body;
    console.log(data)
    const user = await User.findById(data.userId);
    const itemSaving = await SavingAccount.findById(data.id);
    let accountUser = await Account.findByUserId(data.userId)
    const extraMoney = accountUser.balance + itemSaving.fund;
    const ac = await Account.updateBalance(extraMoney,accountUser.accountNumber);
    await SavingAccount.deleteById(data.id);

    const newAccount = await Account.findByUserId(data.userId)
    const teamlate  =`
        <div class="card" style="width: 18rem;">
        <div class="card-body">
        <h5 style="color: green; font-size: 14px; " class="card-title">Tất toán thành công số tiền : ${inMoney(itemSaving.fund)} VND</h5>
        <p class="card-text">Số dư :  ${inMoney(newAccount.balance)}VND</p>
        </div>
    </div>`;

    Email.send(user.email,bank17ez,teamlate)
    res.status(200).json({success:true})
})

//-----------  add saving ------------
router.post("/addSaving",[
    check('data.amount')
        .custom(async function (amount, { req }) {
            console.log(req.body.data)
            if (req.body.data.user.id) {
                const account = await Account.findByUserId(req.body.data.user.id)
                if(!account)
                {
                    throw Error('khong tim thay tai khoan');
                }
                else
                {
                    // Cung ngan hang
                    if(account.balance<parseInt(amount)+50000)
                    {
                    throw Error('Số dư không đủ');
                    }
                    return true;
                }
            }
        }),
],asyncHandler(async function postLogin(req,res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(200).json({success:false , errors})
    }
    // const { data } = req.body;
    // const account = await Account.findByUserId(data.user.id)
    // if(account.balance<parseInt(data.amount)+50000)
    // {
    //     res.json({success : false})
    // }
    // else
    // {
    //     res.json({success : true})
    // }
    const { amount ,user,depositTerm, accountNumber,type} = req.body.data;
    var interestRate = 0;
    switch(depositTerm.toString())
        {
            case "1":
                interestRate = 4.5;
                break;
            case "3":
                interestRate = 5;
                break;
            case "6":
                interestRate = 5.5;
                break;
            case "9":
                interestRate = 5.5;
                break;
            case "12":
                interestRate = 6.8;
                break;
            case "24":
                interestRate = 6.8;
                break;
            default:
                interestRate = 0;
                break;
        }
    
    const account = await Account.findOne({
        where: {
            accountNumber: accountNumber,
        }
    }).then(async (account) => {
        return await User.findById(account.userId);
    }).catch((err) => {
        console.log(err);
    });
    const d = new Date();
    let ran = crypto.randomBytes(3).toString('hex').toUpperCase() +  ('0' + d.getMinutes()).slice(-2) +  ('0' + d.getSeconds()).slice(-2) +  ('0' + d.getMonth() + 1).slice(-2)
    let token = crypto.randomBytes(2).toString("hex").toUpperCase();
    var today = dateTimeToDate(new Date(),0);
    var dt = new Date()
    var closeDate = new Date(dt.setMonth(dt.getMonth() + parseInt(depositTerm)));

    console.log(dt.getFullYear())
    console.log(closeDate.getFullYear())

    let interest = parseInt(amount*interestRate/100);
    let now = dateTimeToDate(new Date(),1)
    confirmInfo = {
        amount,
        depositTerm,
        interestRate,
        interest,
        openDate:today,
        closeDate,
        now,
        type,
        token,
        accountNumber,
        ran,
    }
   

    await Email.send(user.email, "Transaction Confirmation", token);
    console.log(token)
    console.log(confirmInfo)
    return res.status(200).json({success:true,confirmInfo})
    
}))

router.post("/addSaving/verify",async (req,res)=>{
    const { amount,interest,interestRate,openDate,closeDate,depositTerm, accountNumber,type} = req.body.data;
    const ac = await Account.findByAccountNumber(accountNumber)
    const newBalance = parseInt(ac.balance) - parseInt(amount)
    await Account.updateBalance(newBalance,accountNumber);
    const svAccount = await SavingAccount.create({
        fund:amount,
        interest: interest,
        depositTerm: depositTerm,
        interestRate:interestRate,
        openDate:openDate,
        closeDate:closeDate,
        accountAccountNumber:accountNumber,
        type:type,
    })

    const us = await User.findById(ac.userId)
    const teamlate  =`
        <div class="card" style="width: 18rem;">
        <div class="card-body">
        <h5 style="color: green; font-size: 14px; " class="card-title">Thêm TKTK thành công </h5>
        <h6 style=" font-size: 10px; font-weight: 100;" class="card-subtitle mb-2 text-muted">Số tiền : ${inMoney(amount)} VND trong ${depositTerm} tháng</h6>
        <p class="card-text">Số dư :  ${inMoney(newBalance)}VND</p>
        </div>
    </div>`;
    await Email.send(us.email,"Vietcombank",teamlate)
    res.json({success:true})
})

//##############   hien thi danh sach saving   ####################
router.get('/',async (req,res)=>{
    const { accountNumber } = req.body.data;

    var userEmail = req.session.currentUser.email;
    var lengthEmail = userEmail.length;
    subEmail = userEmail.substring(0,6)+"****"+ userEmail.substring(lengthEmail-11,lengthEmail)
    const userSavingAccount = await SavingAccount.findSavingAccountrByAccountNumber(res.locals.account.accountNumber)
    var dateNow = new Date();
    var fund = 0;
    console.log("/////"+res.locals.account.accountNumber)
    const accountNew = await Account.findByAccountNumber(res.locals.account.accountNumber);
    
    if(userSavingAccount.length>0)
    {
        console.log("---"+accountNew)
        userSavingAccount.forEach((x)=>{
            fund = fund + x.fund;
        })
        return res.render('./pages/savingAccount/listSaving',{accountNew,fund:fund,saving:userSavingAccount,errors:null});
    }
    else
    {
        return res.render('./pages/savingAccount/listSaving',{accountNew,fund:0,saving:null,errors:null}); 
    }
});

//--------- hien thi thong tin saving -------------
router.get("/saving/listSaving/:id",asyncHandler(async function postLogin(req,res){
    const {id}=req.params;
    const itemSaving = await SavingAccount.findById(id);
    req.session.idSavingIndex = itemSaving.id;
   

    res.render('./pages/savingAccount/saving',{fund:itemSaving.fund,saving:itemSaving,errors:null});
}))



//---------- tat toan --------------
router.get("/saving/listSaving/tattoan/:id",asyncHandler(async function postLogin(req,res){
    const {id}=req.params;
    const itemSaving = await SavingAccount.findById(id);
    tokenTatToan = crypto.randomBytes(2).toString("hex").toUpperCase();
    Email.send(res.locals.currentUser.email,bank17ez,"Mã xác thực tất toán  : "+tokenTatToan)
    res.render('./pages/savingAccount/tattoan',{email:subEmail,fund:fund,saving:itemSaving,errors:null});
}))

router.post("/saving/listSaving/tattoan/:id",asyncHandler(async function postLogin(req,res){
    if(req.body.OTP.toUpperCase()==tokenTatToan)
    {   
        const {id}=req.params;
        const itemSaving = await SavingAccount.findById(id);
        let accountUser = await Account.findByUserId(req.currentUser.id)
        const extraMoney = accountUser.balance + itemSaving.fund;
        await Account.updateBalance(extraMoney,res.locals.account.accountNumber);
        await SavingAccount.deleteById(id);
        Email.send(res.locals.currentUser.email,bank17ez,"Tất toán thành công số tiền  : "+itemSaving.fund)
        res.render('./pages/savingAccount/savingAccount2')
    }
    else
    {
        res.render('./pages/savingAccount/tattoan',{
            errors:"Token không chính xác",
            email:subEmail,
            fund:itemSaving.fund,
            saving:itemSaving,
            errors:null});
    }
}))


//-------add saving account----------
var fund = 0;
router.get("/saving/addSaving",asyncHandler(async function postLogin(req,res){
    userSavingAccount = await SavingAccount.
    findSavingAccountrByAccountNumber(req.session.account.accountNumber)

    userSavingAccount.forEach((x)=>{
        fund=fund + parseInt(x.fund);
    })
    res.render('./pages/savingAccount/savingAccount',{fund:fund,errors:null});
}))


router.post('/addSaving',[
    body('amountSaving')
        .custom(async function(SoTienBody,{req}){
            if(parseInt(SoTienBody)<1000000)
            {
                throw Error('Số tiền tối thiểu 1.000.000');
            }
            account = await Account.findByUserId(req.session.currentUser.id);
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
            var dt = new Date()
            var closeDate = new Date(dt.setMonth(dt.getMonth() + depositTerm))
            let interest = parseInt(SoTien*interestRate/100)
            const svAccount = await SavingAccount.create({
                fund:SoTien,
                interest: interest,
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
        formInterest = req.body.HinhThuc;
        SoTien = parseInt(req.body.amountSaving);
        token = crypto.randomBytes(2).toString("hex").toUpperCase(); res.locals.token = token;
        Email.send(res.locals.currentUser.email,bank17ez,"Mã xác thực TKTK : "+token)
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
