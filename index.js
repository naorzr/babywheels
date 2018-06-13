const express = require("express");
const app = express();
const portfinder = require("portfinder");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

var configInfo = {};
var baby = { app };

baby.setUpJwtAuth = function setUpJwtAuth(
  jwtschema,
  secretSauce,
  userModelSchema
) {
  app.use(passport.initialize());
  require("./authentication/auth")(
    passport,
    jwtschema,
    secretSauce,
    userModelSchema
  );
};

baby.generateToken = require("./authentication/auth").generateToken;

baby.upAndRunning = function upAndRunning(dataBaseUri, port, bodyParse = true) {
  configInfo.dataBaseUri = dataBaseUri || null;
  configInfo.port = port || null;

  if (bodyParse) {
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    app.use(bodyParser.json());
  }
  if (dataBaseUri) {
    mongoose
      .connect(dataBaseUri)
      .then(() =>
        console.log(`Connected Successfuly to Database ${dataBaseUri}`)
      )
      .catch(e => console.log(e));
  }
  if (!port) {
    portfinder
      .getPortPromise()
      .then(port => {
        configInfo.port = port;
        app
          .listen(port, () => console.log(`Server Started on ${port}`))
          .on("error", err => {
            console.log("Err!", err);
          });
      })
      .catch(err => console.log(err));
  } else {
    app
      .listen(port, () => console.log(`Server Started on ${port}`))
      .on("error", err => {
        console.log("Err!", err);
      });
  }
};

setTimeout(() => console.log(JSON.stringify(configInfo)), 200);
module.exports = baby;
