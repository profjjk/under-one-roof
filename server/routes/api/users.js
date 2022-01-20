const userController = require('../../controllers/userController');
const router = require('express').Router();

router.route("/")
    .post(userController.add)

router.route("/:id")
    .get(userController.findAll)
    .delete(userController.delete)

module.exports = router;