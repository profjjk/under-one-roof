const choreController = require('../../controllers/choreController');
const router = require('express').Router();

router.route("/")
    .post(choreController.add);

router.route("/:id")
    .get(choreController.findAll)
    .delete(choreController.delete);

module.exports = router;