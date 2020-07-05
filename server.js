var express = require('express');
var app = express();
const ejs = require('ejs')
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
var port = process.env.PORT || 3000;

// --------DATABASE------------
const db = require('./services/db')
const User = require('./services/user');
const Account = require('./services/account');
const SavingAccount = require('./services/saving_account');
const Transaction = require('./services/transaction');
const { pipeline } = require('nodemailer/lib/xoauth2');

// ---------NPM INSTALL---------
app.use(bodyParser.urlencoded({ extended: false }));
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(cookieSession({secret: 'todotopsecret'}))
// --------APP SET------------
app.set('views', './views');
app.set('view engine', 'ejs');


// ----------APP GET------------
app.get('/logout',require('./routes/logout'))

// --------APP USE----------
app.use(express.static('public'))
app.use('/register',require('./routes/register'))
app.use('/',require('./routes/login'))
app.use('/multer',require('./routes/multer'))
app.use('/home',require('./routes/home'))
// -------CONNECTION---------
db.sync().then(function(){
  app.listen(port);

}).catch(function(err){
console.error(err)
})
