const passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../model/user');
var opts = {}
// this will extract jwt from request
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// this is server key
opts.secretOrKey = 'codeil';


// using strategy
// note user id  and password were not compared
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    //   user detail is present in jwt_payload it is checked if user is present or not
    User.findOne({ id: jwt_payload._id }, function (err, user) {
        if (err) {
            console.log('error in finding user from JWT');
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = passport;