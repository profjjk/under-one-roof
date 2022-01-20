const eventController = require('../../controllers/eventController');
const router = require('express').Router();

router.route("/")
    .post(eventController.create);

router.route("/:id")
    .delete(eventController.delete)
    .get(eventController.findAll);

module.exports = router;