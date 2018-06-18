# babywheels

A library that helps developers set up the rudendant backend code quickly
with fewer lines of code (much fewer)

## Installation

`npm i babywheels`

## Usage - Setting up server and connecting to database

    var baby = require('babywheels');

    baby.upAndRunning(databaseURI, port);

Babywheels uses expressjs, mongoose and passport.
No need to require these models

## Accessing the express app object

    var app = baby.app;

## Tests

`npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.(Styled by prettier extension) Add bdd tests for any new or changed functionality. Lint and test your code.
