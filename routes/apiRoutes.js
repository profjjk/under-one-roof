// Dependencies
// =============================================================
var db = require("../models");
const path = require("path");
const router = require("express").Router();
const expenseController = require("../controllers/expenseController");
const choreController = require("../controllers/choreController");
const { verifySignUp } = require("../config/middleware");
const authController = require("../controllers/auth.controller");
const eventController = require("../controllers/eventController");
const userController = require("../controllers/userController");

// API Routes
// =============================================================

// Expenses
router
  .route("/api/expenses")
  .post(expenseController.add);
  
router
  .route("/api/expenses/:id")
  .put(expenseController.edit)
  .get(expenseController.findAll)
  .delete(expenseController.delete);


// Chores
router
  .route("/api/chores")
  .post(choreController.add);
  
router
  .route("/api/chores/:id")
  .get(choreController.findAll)
  .delete(choreController.delete);


// Authentication
router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router
  .route("/api/auth/signup")
  .post(
  [
    verifySignUp.checkDuplicateUsernameOrEmail
  ],
  authController.signup);

router
  .route("/api/auth/signin")
  .post(authController.signin);


// EVENTS
router
  .route("/api/events")
  .post(eventController.create);
  
router 
  .route("/api/events/:id")
  .delete(eventController.delete)
  .get(eventController.findAll);


// USERS
router
  .route("/api/users")
  .post(userController.add)
  
router
  .route("/api/users/:id")
  .get(userController.findAll)
  .delete(userController.delete)


// send react app
// we need to send the client the compiled index.html file
if (process.env.NODE_ENV === "production") {
    router.use(function (req, res) {
      res.sendFile(path.join(__dirname, "../client/public/index.html"))
    })
}

module.exports = router;