const express = require("express");
const path = require("path");
const db = require("./models");
const cors = require("cors");

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5050;

app.use('*', cors());

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static asset middleware
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get(function(req, res) {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Routes
app.use(routes);

db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
});