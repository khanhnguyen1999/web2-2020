const User = require('../services/user')
const Account = require('../services/account')
const Transaction = require('../services/transaction')
const {Router} = require('express')
const asyncHandler = require('express-async-handler')
const router = new Router();
const { json } = require('body-parser');
const Op = require("sequelize").Op;

router.post('/getAccount',async function getLogin(req,res){
    const {userId} = req.body;
    console.log(userId);
    const account = await Account.findByUserId(userId);
    res.json({data:account});
});

router.post('/getUserByEmail',async function getLogin(req,res){
    const {email} = req.body;
    console.log(email);
    const user = await User.findByEmail(email);
    res.json({data:user});
});

router.post('/refreshUser',async function getLogin(req,res){
    const {userId} = req.body;
    console.log(userId);
    const user = await User.findById(userId);
    if(!user)
    {
        return res.json({success:false});
    }
    return res.json({data:user});
});


router.post('/getListTransaction',async (req,res)=>{
    const {userId} = req.body;
    console.log(userId);

    const account = await Account.findByUserId(userId);

    const transactions = await Transaction.findAll(
        {},
        {
            where: {
                [Op.or]: [
                    {
                        accountNumber : account.accountNumber,
                    },
                    {
                        beneficiaryAccount: account.accountNumber,
                    },
                ],
            },
        }
    );

    res.json({data:transactions});
});
router.post('/',asyncHandler(async function postLogin(req,res){
    const user = await User.findByUsername(req.body.acc_username)
    if(!user || !User.verifyPassword(req.body.acc_password,user.password)){
        return res.redirect('/')
    }
    req.session.userId = user.id;
    // currentUser = user.id;
    res.redirect('/home')   
}));
module.exports = router;


