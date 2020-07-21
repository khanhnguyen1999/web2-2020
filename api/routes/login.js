const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const cryptojs = require("crypto-js");
const rs = require("randomstring");
const User = require("../models/user");

router
    .route("/")
    // .get((req, res, next) => {
    //     // res.render("page/login");
    //     res.send("Login");
    // })
    .post(
        asyncHandler(async (req, res, next) => {
            const { username, password } = req.body;
            const user = await User.findByUsername(username);

            if (!user || !User.verifyPassword(password, user.password)) {
                // return res.redirect("/");
                return res.json({ message: "Fail", redirectSignal: false });
            }

            // req.session.userId = user.id;
            // res.redirect("/home");

            // Generate random string
            const secretKey = rs.generate(12);
            // Encrypt
            const accessId = cryptojs.AES.encrypt(JSON.stringify(user.username), secretKey).toString();

            //Decrypt
            // const bytes = cryptojs.AES.decrypt(token, key);
            // var decryptedData = JSON.parse(bytes.toString(cryptojs.enc.Utf8));

            const currentUser = {
                id: user.id,
                username: user.username,
                email: user.email,
                displayName: user.displayName,
            };

            res.json({ message: "Success", redirectSignal: true, accessId, currentUser });
        })
    );

module.exports = router;
