const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

var Dinosaure = require("../models/dinosaure");

passport.use(
  new localStrategy({ usernameField: "name" }, (username, password, done) => {
    Dinosaure.findOne({ name: username }, (error, dino) => {
      if (error) return done(error);
      // erreur d'identifiant
      else if (!dino)
        return done(null, false, { message: "Identifiant incorrect" });
      // mot de passe erroné
      else if (!dino.verifyPassword(password))
        return done(null, false, { message: "Mot de passe incorrect" });
      // authentication succeeded
      else return done(null, dino);
    });
  })
);
