// --------Libary------------
var express = require('express');
const bodyParser = require('body-parser');
var app = express();
const ejs = require('ejs');
const cookieSession = require('cookie-session');
var cors = require('cors')

var port = process.env.PORT || 3000;

// --------DATABASE------------
const db = require('./services/db')
const User = require('./services/user');
const Account = require('./services/account');
const SavingAccount = require('./services/saving_account');
const RSavingAccount = require('./autoupdate');
const Transaction = require('./services/transaction');
const Bank = require('./services/bank');
const beneficiaryAccount = require('./services/beneficiaryAccount');

// ---------NPM INSTALL---------
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession({secret: 'todotopsecret'}))
app.use(express.json());
app.use(cors())


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
app.use('/transaction',require('./routes/transaction'));

// --------Saving Account ----------
app.use('/saving',require('./routes/savingAccount'));
app.get('/saving/listSaving/:id',require('./routes/savingAccount'));
app.get('/saving/listSaving/tattoan/:id',require('./routes/savingAccount'));
app.post('/saving/listSaving/tattoan/:id',require('./routes/savingAccount'));
app.get('/saving/addSaving',require('./routes/savingAccount'));

// -------- Admin ------------

app.use("/admin", require("./routes/admin"));


// --------APP USE----------
app.use(express.static('public'));
app.use('/register',require('./routes/register'));
app.use('/',require('./routes/login'));
app.use('/login',require('./routes/login'));
app.use("/verify", require("./routes/multer"));
app.use("/forgot-password", require("./routes/forgotPassword"));
app.use("/change-password", require("./routes/changePassword"));

// --------API INFORMATION ------------
app.use('/information',require('./routes/information'))

// -------CONNECTION---------
db.sync().then(function(){
  app.listen(port);

}).catch(function(err){
console.error(err)
})
