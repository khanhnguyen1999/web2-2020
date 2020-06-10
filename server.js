var express = require('express');
var app = express();
var port = process.env.PORT || 3000;


// --------APP SET------------
app.set('views', './views');
app.set('view engine', 'ejs');


// ----------APP GET------------
app.get('/', function (req, res) {
   res.render('pages/home');
});

// --------APP USE----------
app.use(express.static('public'))


var server = app.listen(port, function () {
  var host = server.address().address
  console.log("Ung dung Node.js dang hoat dong tai dia chi: http://%s:%s", host, port)
});
