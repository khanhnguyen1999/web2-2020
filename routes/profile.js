const router = require("express").Router();

router
    .route("/")
    .get(async (req, res, next) => {
        res.render("./ducbui/pages/profiles/profile");
    })
    .post(async (req, res, next) => {});

module.exports = router;
