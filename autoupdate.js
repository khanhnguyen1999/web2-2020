const db = require('./services/db')
const User = require('./services/user');
const Account = require('./services/account');
const SavingAccount = require('./services/saving_account');
const Transaction = require('./services/transaction');
const Bank = require('./services/bank');
const BeneficiatyAccount= require('./services/beneficiaryAccount');
const Email = require('./services/email');
const asyncHandler = require('express-async-handler')
var CronJob = require('cron').CronJob;


var job = new CronJob('00 01 00 * * *',asyncHandler(async function() {
    const listSavingAccount = await SavingAccount.findAll();
    console.log(listSavingAccount)
    let now = new Date();
    listSavingAccount.forEach(async (x)=>{
        let closeDate = new Date(x.openDate.setMonth(x.openDate.getMonth() + x.depositTerm))
        if(now>=x.closeDate){
            if(parseInt(x.type)==1)
            {
                let accountUser = await Account.findAccountrByAccountNumber(x.accountAccountNumber)
                let extraMoney = accountUser.balance + parseInt(x.interest);
                await Account.updateBalance(extraMoney,accountUser.accountNumber);
            }
            else
            {
                let extraMoney = x.fund + parseInt(x.interest);
                await SavingAccount.updateFund(extraMoney,x.id);
            }
            console.log("/\/\/\\/\/\/\/\/\/")
            let interest = parseInt(x.fund*x.interestRate/100)
            let newOpenDAte = new Date(now.setMonth(now.getMonth() + x.depositTerm+1))
            console.log(newOpenDAte.getMonth()+"  "+newOpenDAte.getFullYear())
            let DateNow = new Date();
            await SavingAccount.updateDateSaving(DateNow,newOpenDAte,interest,x.id);
        } 
    })
}), null, true, 'Asia/Ho_Chi_Minh');
module.exports =  job



