const { Router } = require("express");
const router = new Router();
const requireLoggedIn = require("../middlewares/requireLoggedIn");
router.use(requireLoggedIn);
router.get("/home", function (req, res) {
    res.render("pages/home");
});
module.exports = router;
