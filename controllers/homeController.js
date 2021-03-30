const db = require("../models");

module.exports = {
    get: function(req, res) {
        db.Home.findAll({where: { id: req.params.id }})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
}