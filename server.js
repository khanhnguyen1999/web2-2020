// --------Libary------------
var express = require('express');
const bodyParser = require('body-parser');
var app = express();
const ejs = require('ejs');
const cookieSession = require('cookie-session');
var port = process.env.PORT || 3000;

// --------DATABASE------------
const db = require('./services/db')
const User = require('./services/user');
const Account = require('./services/account');
const SavingAccount = require('./services/saving_account');
const Transaction = require('./services/transaction');
const Bank = require('./services/bank');
const beneficiaryAccount = require('./services/beneficiaryAccount');

// ---------NPM INSTALL---------
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession({secret: 'todotopsecret'}))

// --------APP SET------------
app.set('views', './views');
app.set('view engine', 'ejs');


// ----------APP GET------------
app.get('/home', function (req, res) {
   res.render('pages/home');
});
app.get('/logout',require('./routes/logout'));

// --------Transaction----------
app.use(require('./middlewares/auth'));
app.use('/transaction',require('./router/transaction'));

// --------APP USE----------
app.use(express.static('public'))
app.use('/register',require('./routes/register'))
app.use('/',require('./routes/login'))

// -------CONNECTION---------
db.sync().then(function(){
  app.listen(port);

}).catch(function(err){
console.error(err)
})
