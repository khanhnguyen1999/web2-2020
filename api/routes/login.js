const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const User = require("../services/user");

router
    .route("/")
    .get((req, res, next) => {
        // res.render("page/login");
        res.send("Login");
    })
    .post((req, res, next) => {
        asyncHandler(async function postLogin(req, res) {
            const user = await User.findByUsername(req.body.username);

            if (
                !user ||
                !User.verifyPassword(req.body.password, user.password)
            ) {
                return res.redirect("/");
            }

            req.session.userId = user.id;
            // res.redirect("/home");
            res.send({ message: "" });
        });
    });

// router.get("/", function getLogin(req, res) {
//     res.render("pages/login");
// });

// router.post(
//     "/",
//     asyncHandler(async function postLogin(req, res) {
//         const user = await User.findByUsername(req.body.acc_username);
//         if (
//             !user ||
//             !User.verifyPassword(req.body.acc_password, user.password)
//         ) {
//             return res.redirect("/");
//         }
//         req.session.userId = user.id;
//         // currentUser = user.id;
//         res.redirect("/home");
//     })
// );

module.exports = router;
