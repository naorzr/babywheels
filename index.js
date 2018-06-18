const express = require("express");
const app = express();
const portfinder = require("portfinder");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

/**
 * Holds the app configurations
 */
var configInfo = {};
var baby = { app };

/**
 * setUpJwtAuth
 * @param {String} jwtschema jwt schema to be concatenated to the head of a token
 * @param {String} secretSauce Secret or Key used as a salt for the token header
 * @param {Schema} userModelSchema User model schema that will be used authenticate the user by payload info
 * Sets up the passport middleware
 */
baby.setUpJwtAuth = function setUpJwtAuth(
  jwtschema,
  secretSauce,
  userModelSchema
) {
  // Adds middleware
  app.use(passport.initialize());
  // Initializing the configuration for passport jwt strategy
  require("./authentication/auth")(
    passport,
    jwtschema,
    secretSauce,
    userModelSchema
  );
};

baby.configJwtStrategy = require("./authentication/auth").configJwtStrategy;

/**
 * upAndRunning
 * @param {String} dataBaseUri required
 * @param {Number} port if no port is passed, function searchs for a free local host
 * @param {Boolean} bodyParse defaults to true, parses json and urlencoded
 */
baby.upAndRunning = function upAndRunning(dataBaseUri, port, bodyParse = true) {
  configInfo.dataBaseUri = dataBaseUri || null;
  configInfo.port = port || null;

  if (bodyParse) {
    // Parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));

    // Parse application/json
    app.use(bodyParser.json());
  }
  if (dataBaseUri) {
    // Connect to database
    mongoose
      .connect(dataBaseUri)
      .then(() =>
        console.log(`Connected Successfuly to Database ${dataBaseUri}`)
      )
      .catch(e => console.log(e));
  }
  if (!port) {
    // If no port is find, run the server on a free local port
    portfinder
      .getPortPromise()
      .then(port => {
        configInfo.port = port;
        // Initialize server
        app
          .listen(port, () => console.log(`Server Started on ${port}`))
          .on("error", err => {
            console.log("Err!", err);
          });
      })
      .catch(err => console.log(err));
  } else {
    // Initialize server
    app
      .listen(port, () => console.log(`Server Started on ${port}`))
      .on("error", err => {
        console.log("Err!", err);
      });
  }
};

// TEST: for testing purposes
setTimeout(() => console.log(JSON.stringify(configInfo)), 200);
module.exports = baby;
