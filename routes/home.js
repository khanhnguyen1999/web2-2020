const router = require("express").Router();
const requireLoggedIn = require("../middlewares/requireLoggedIn");

router.use(requireLoggedIn);

router.get("/", (req, res) => {
    res.render("ducbui/pages/landing");
});

module.exports = router;
