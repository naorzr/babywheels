const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");

const opts = {};

/**
 *
 * @param {passport module} passport
 * @param {String} jwtschema jwt schema to be concatenated to the head of a token
 * @param {String} secretSauce Secret or Key used as a salt for the token header
 * @param {Schema} userModelSchema User model schema that will be used authenticate the user by payload info
 * Configures the jwt strategy
 */
function configJwtStrategy(passport, jwtschema, secretOrKey, UserModelSchema) {
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme(jwtschema);
  opts.secretOrKey = secretOrKey;
  opts.jwtschema = jwtschema;
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      UserModelSchema.findById(jwt_payload.id)
        .then(user => {
          if (model) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(e => console.log(e));
    })
  );
}

/**
 *
 * @param {Object} payload an object containing at least the user id
 * @param {Number} expiresIn defaults to 1 day, number passed as seconds
 * Generates and return a token
 */

module.exports = function generateToken(
  payload,
  expiresIn = { expiresIn: 3600 * 24 }
) {
  jwt.sign(payload, opt.secretOrKey, expiresIn, (err, token) => {
    if (err) {
      return JSON.parse(err);
    }
    return { token: opt.jwtschema + " " + token };
  });
};
module.exports = configJwtStrategy;
