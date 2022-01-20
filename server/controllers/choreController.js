const db = require("../models");

module.exports = {
    add: function(req, res) {
        db.Chore.create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    findAll: function (req, res) {
        db.Chore.findAll({ where: { homeId: req.params.id }})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    delete: (req, res) => {
        db.Chore.destroy({
          where: { id: req.params.id }
        }).then(deletedChore => {
          deletedChore ? res.send(true) : res.send(false);
        }).catch(err => res.status(422).json(err));
    }
};