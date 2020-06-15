// --------Libary------------
var express = require('express');
const bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

// --------Datatbase------------
const db = require('./services/db')
const User = require('./services/user');
const Account = require('./services/account');
const SavingAccount = require('./services/saving_account');
const Transaction = require('./services/transaction');
const Bank = require('./services/bank');
const beneficiaryAccount = require('./services/beneficiaryAccount');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// --------APP SET------------
app.set('views', './views');
app.set('view engine', 'ejs');


// ----------APP GET------------
app.get('/', function (req, res) {
  res.render('pages/home');
});
app.get('/home', function (req, res) {
   res.render('pages/home');
});


// --------Transaction----------
app.use(require('./middlewares/auth'))
app.use('/transaction',require('./router/transaction'));

// --------APP USE----------
app.use(express.static('public'))


// var server = app.listen(port, function () {
//   var host = server.address().address
//   console.log("Ung dung Node.js dang hoat dong tai dia chi: http://%s:%s", host, port)
// });

db.sync().then(function(){
  app.listen(port);

}).catch(function(err){
console.error(err)
})
