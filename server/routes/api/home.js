const homeController = require('../../controllers/homeController');
const router = require('express').Router();

router.route("/")
    .get(homeController.get)

module.exports = router;