// --------Libary------------
var express = require("express");
const bodyParser = require("body-parser");
var app = express();
const ejs = require("ejs");
const cookieSession = require("cookie-session");
var port = process.env.PORT || 3000;

// --------DATABASE------------
const db = require("./services/db");
const User = require("./services/user");
const Account = require("./services/account");
const SavingAccount = require("./services/saving_account");
const RSavingAccount = require("./autoupdate");
const Transaction = require("./services/transaction");
const { pipeline } = require("nodemailer/lib/xoauth2");
const Bank = require("./services/bank");
const beneficiaryAccount = require("./services/beneficiaryAccount");

// ---------NPM INSTALL---------
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession({ secret: "0000" }));
app.use(express.json());

// --------APP SET------------
app.set("views", "./views");
app.set("view engine", "ejs");

// ----------APP GET------------
app.get("/logout", require("./routes/logout"));

// --------Transaction----------
app.use(require("./middlewares/auth"));
app.use("/transaction", require("./routes/transaction"));

// --------Saving Account ----------
app.use("/saving", require("./routes/savingAccount"));
// app.get("/saving/listSaving/:id", require("./routes/savingAccount"));
// app.get("/saving/listSaving/tattoan/:id", require("./routes/savingAccount"));
// app.post("/saving/listSaving/tattoan/:id", require("./routes/savingAccount"));
// app.get("/saving/addSaving", require("./routes/savingAccount"));

// --------APP USE----------
app.use(express.static("public"));
app.use("/", require("./routes/login"));
app.use("/home", require("./routes/home"));
app.use("/register", require("./routes/register"));
app.use("/profile", require("./routes/profile"));
app.use("/admin", require("./routes/admin"));
app.use("/multer", require("./routes/multer"));
app.use("/forget-password", require("./routes/forgetPassword"));
app.use("/change-password", require("./routes/changePassword"));

// -------CONNECTION---------
db.sync()
    .then(function () {
        app.listen(port);
    })
    .catch(function (err) {
        console.error(err);
    });
