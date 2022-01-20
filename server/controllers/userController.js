const db = require("../models");

module.exports = {
    add: function(req, res) {
        db.User.create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    findAll: function (req, res) {
        db.User.findAll({where: {HomeId: req.params.id}})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    delete: function (req, res) {
        db.User.destroy({where: {id: req.params.id}})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
};
