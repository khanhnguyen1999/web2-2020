var express = require('express');
var app = express();
const ejs = require('ejs')
var port = process.env.PORT || 3000;

// --------Datatbase------------
const db = require('./services/db')
const User = require('./services/user');
const Account = require('./services/account');
const SavingAccount = require('./services/saving_account');
const Transaction = require('./services/transaction');


// --------APP SET------------
app.set('views', './views');
app.set('view engine', 'ejs');


// ----------APP GET------------
app.get('/', function (req, res) {
   res.render('pages/login');
});
app.get('/home', function (req, res) {
   res.render('pages/home');
});
app.get('/register',function(req,res){
   res.render('pages/register')
})
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
