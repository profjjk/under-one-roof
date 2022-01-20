const db = require("../../models");

const Home = db.Home;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  Home.findOne({
    where: {
      username: req.body.username
    }
  }).then(home => {
    if (home) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    // Email
    Home.findOne({
      where: {
        email: req.body.email
      }
    }).then(home => {
      if (home) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;