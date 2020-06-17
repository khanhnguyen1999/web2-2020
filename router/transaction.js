
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
const Email = require('../services/email')
const { tableName } = require('../services/user');
const crypto = require('crypto')

var account ;
var BeneficiaryAccount ;
var content ;
var token;
var SoTien;

var totalMoney;
var extraMoney;
var beneficiaryExtraMoney
router.get('/',async (req,res)=>{
    // const listBank=[
    //     {bank:'Vietcombank',id:'36'},
    //     {bank:'Agribank',id:'05'},
    //     {bank:'Đông Á',id:'06'},
    //     {bank:'BIDV',id:'18'},
    //     {bank:'MBBank',id:'22'},
    //     {bank:'TPBank',id:'23'},
    //     {bank:'VPBank',id:'32'},
    //     {bank:'Eximbank',id:'31'},
    //     {bank:'VIB',id:'41'},
    //     {bank:'Techcombank',id:'07'},
    // ];
    // for(var i=0;i<listBank.length;i++)
    // {
    //     console.log("  cccc" +listBank[i].bank)
    //     await Bank.create({
    //         nameBank: listBank[i].bank,
    //         idBank: listBank[i].id,
    //     })
    // }
    const listBank =await Bank.AllBank();
    return res.render('./pages/transactions/transaction',{listBank:listBank});  
});
router.post('/',[
    body('SoTien')
        .custom(async function(SoTien){
            
            if(SoTien<50){
                throw Error('user exists');
            }
            return true;
        }),

    body('STKHuongThu')
        .custom(async function(STKHuongThu){
            if(!STKHuongThu)
            {
                return false;
            }
            else
            {
                const account = Account.findAccountrByAccountNumber(STKHuongThu)
                if(!account)
                {
                    throw Error('AccountNumber exists');
                }
    
            }
           
            return true;
        }),

        
] ,asyncHandler(async function(req,res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("loi")
        return res.status(422).render('./pages/transactions/transaction',{errors :errors.array( )});
    }
   
   if(!req.body.STKHuongThu)
   {
       console.log(token)
       if(req.body.OTP.toUpperCase()==token)
       {
            await Account.updateBalance(extraMoney,res.locals.account.accountNumber);
            await Account.updateBalance(beneficiaryExtraMoney,BeneficiaryAccount.accountNumber);
            await Email.send('chi1caithoi@gmail.com','Vietcombank',account.accountNumber+" "+res.locals.user.displayName+" tới "+
            BeneficiaryAccount.accountNumber+" "+BeneficiaryUser.displayName +" : "+req.body.SoTien +"\nSố dư : "+extraMoney )
            res.render('./pages/transactions/transaction2')
       }
       else
       {
            throw Error('token khong chinh xac');
       }
       
   }
   else
   {
         account =await Account.findAccountrByAccountNumber(res.locals.account.accountNumber); 
         BeneficiaryAccount =await Account.findAccountrByAccountNumber(req.body.STKHuongThu);
         BeneficiaryUser = await User.findUserById(BeneficiaryAccount.userId)
         content = req.body.NoiDung==''?account.accountNumber+" "+res.locals.user.displayName+" tới "+
            BeneficiaryAccount.accountNumber+" "+BeneficiaryUser.displayName+" " : req.body.NoiDung;
        
        const transaction = await Transaction.create({
            accountNumber:res.locals.account.accountNumber,
            amount: req.body.SoTien,
            content:content,
            beneficiaryBank:req.body.NganHang,
            beneficiaryAccount : req.body.STKHuongThu

        })
        SoTien= req.body.SoTien;
        totalMoney = parseInt(req.body.SoTien) + 5000;
        extraMoney = parseInt(account.balance) - totalMoney;
        beneficiaryExtraMoney = parseInt(BeneficiaryAccount.balance)+parseInt(req.body.SoTien)

        token = crypto.randomBytes(2).toString("hex").toUpperCase(); res.locals.token = token;
        if(extraMoney<50000)
        {
            throw Error('khong du tien');
        }
        else
        {
            // await Account.updateBalance(extraMoney,res.locals.account.accountNumber);
            // await Account.updateBalance(beneficiaryExtraMoney,req.body.STKHuongThu)
            // await Email.send('chi1caithoi@gmail.com','Vietcombank',account.accountNumber+" "+res.locals.user.displayName+" tới "+
            // BeneficiaryAccount.accountNumber+" "+BeneficiaryUser.displayName +" : "+req.body.SoTien +"\nSố dư : "+extraMoney )
            Email.send(res.locals.user.email,"Vietcombank",token)
            return res.render('./pages/transactions/transaction1',{
                BeneficiaryAccount:BeneficiaryAccount,
                BeneficiaryUser:BeneficiaryUser,
                account:account,
                SoTien:req.body.SoTien,
                content:content,
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
    // const user = await User.create({
    //     email: req.body.email,
    //     displayName: req.body.displayName,
    //     password: (await User.hashPassword(req.body.password)).toString(),
    //     token : crypto.randomBytes(3).toString('hex').toUpperCase(),
        
    // })
    // req.session.userId = user.id
    // await Email.send(user.email, 'kich hoat tai khoan' ,`${process.env.BASE_URL}/login/activate/${user.id}/${user.token}`);
    // res.redirect('/')
}));
module.exports =router;