require("./db.js");
require("./config/passportConfig");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");
const passport = require("passport");

const port = 3000;

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
app.use("/api", routes);

app.listen(port, () => {
  console.log("Le serveur a démarré sur le port '3000'");
});
