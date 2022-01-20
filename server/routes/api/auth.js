const { verifySignUp } = require('../../config/middleware');
const authController = require('../../controllers/auth.controller');
const router = require('express').Router();

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.route("/signup")
    .post(verifySignUp.checkDuplicateUsernameOrEmail, authController.signup);

router.route("/signin")
    .post(authController.signin);

module.exports = router;