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
const UserStatus = require("../middlewares/userStatus");

var token;
var fee;
var listBank;
var totalMoney;
var extraMoney;
var binRoot = process.env.BIN || 9704;


// router.use(UserStatus);
const inMoney = (num) => {
    var rs = String(num);
    const formatter = new Intl.NumberFormat('de-DE', {
        currency: 'VND',
        minimumFractionDigits: 0
    })
    rs = formatter.format(rs)
    return rs;
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
                    } // Khac ngan hang
                    else {
                        fee = bank.externalFee;
                    }

                    totalMoney = parseInt(amount) + parseInt(parseInt(amount) * fee); // Tong tien da bao gom phi
                    const newBalance = parseInt(account.balance) - parseInt(totalMoney); // So tien con lai

                    // Kiem tra so tien con lai sau khi chuyen
                    if (newBalance < 100000) {
                        throw Error("Check your balance!");
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

                    const lm = parseInt(account.limitAmount) +parseInt(amount)

                    if(lm > account.limit){
                        throw Error('Vượt quá hạn mức chuyển khoản');
                    }
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
                }else if(account.status!=="ACTIVE"){
                    throw Error('Số tài khoản chưa kích hoạt hoặc đạng bị khóa');
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

        const today = new Date();
        const hour = ('0' + today.getHours()).slice(-2);
        const min = ('0' + today.getMinutes()).slice(-2);
        const sec = ('0' + today.getSeconds()).slice(-2);
        const date = ('0' + today.getDate()).slice(-2);
        const mon = ('0' + (today.getMonth() + 1)).slice(-2);
        const transactionID = "" + date + mon + hour + min + sec + crypto.randomBytes(3).toString('hex').toUpperCase();
        let now = dateTimeToDate(new Date(),1)
        confirmInfo = {
            beneficiaryAccountNumber,
            amount,
            content,
            totalFee,
            displayName: account.displayName,
            bin:binBank,
            token,

            transactionID,
            now,
        }
        await Email.send(user.email, "Transaction Confirmation", token);
        console.log(token)
        return res.status(200).json({success:true,confirmInfo})
    }

})

router.post('/verify',async(req,res)=>{
    const {accountNumber, binBank, beneficiaryAccountNumber, amount, content,totalFee,transactionID } = req.body.data;
    console.log(accountNumber)
    console.log("sdasd"+req.body.data)

    
    var newBalance=0;

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
                 newBalance = account.balance - totalMoney;

                // account: New Balance
                await Account.updateBalance(newBalance, accountNumber);
                await Account.updateLimitAmount(amount,accountNumber)

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
                const accountBenefi = await Account.findByAccountNumber(beneficiaryAccountNumber);
                const userBenefi = await User.findById(accountBenefi.userId)
                const ac = await Account.findByUserId(account.userId)
                const user = await User.findById(account.userId)
                const teamlate  =`
                    <div class="card" style="width: 18rem;">
                    <div class="card-body">
                    <h5 style="color: green; font-size: 17px; " class="card-title">Chuyển khoản thành công</h5>
                    <h6 style=" font-size: 11px; font-weight: 100;" class="card-subtitle mb-2 text-muted">${user.displayName} gửi đến ${beneficiaryAccountNumber} : ${userBenefi.displayName} số tiền : ${inMoney(amount)}VND</h6>
                    <p class="card-text">Số dư :  ${inMoney(ac.balance)}VND</p>

                    </div>
                </div>`;

                const newBalanceBenefi = parseInt(accountBenefi.balance)
                const teamlateBenefi  =`
                    <div class="card" style="width: 18rem;">
                    <div class="card-body">
                    <h5 style="color: green; font-size: 17px; " class="card-title">${content}</h5>
                    <h6 style=" font-size: 10px; font-weight: 100;" class="card-subtitle mb-2 text-muted">${user.displayName} gửi đến ${beneficiaryAccountNumber} : ${userBenefi.displayName} số tiền : ${inMoney(amount)}VND</h6>
                    <p class="card-text">Số dư : ${inMoney(newBalanceBenefi)}VND</p>

                    </div>
                </div>`;
                Email.send(userBenefi.email,"Vietcombank",teamlateBenefi)
                Email.send(user.email,"Vietcombank",teamlate)

            }).catch((err) => {
                console.log(err);
            });

        
        }).catch((err) => {
            console.log(err);
        });
        
        
    return res.status(200).json({success:true})
});

module.exports = router;
