const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const db = require("./models");
// const cors = require("cors");

// var corsOptions = {
//   origin: `http://localhost:3000`
// };

// app.use(cors(corsOptions));
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Routes
const routes = require("./routes/apiRoutes.js");
app.use(routes);


db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
});