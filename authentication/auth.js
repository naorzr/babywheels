const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");

const opts = {};

function generatePass(passport, jwtschema, secretOrKey, UserModelSchema) {
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

function generateToken(payload, expiresIn = { expiresIn: 3600 * 24 }) {
  jwt.sign(payload, opt.secretOrKey, expiresIn, (err, token) => {
    if (err) {
      res.status(404).json(err);
    }
    res.json({ success: true, token: opt.jwtschema + " " + token });
  });
}
module.exports = generatePass;
module.exports.generateToken = generateToken;
