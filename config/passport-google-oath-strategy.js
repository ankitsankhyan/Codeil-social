const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const users = require('../model/user');
const crypto = require('crypto');

passport.use(new googleStrategy({
    clientID:"997460630253-m8ch3gs8aadae6kl4v8477cak4t5tsl4.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/user/auth/google/callback"
},
//   callback function
  function(accessToken, RefreshToken, profile, done){
    users.findOne({email: profile.emails[0].value}).exec(function(err, user){
        if(err){
            console.log('error in google strategy-passport', err);
           return;
                }

                console.log(profile);
        if(user){
               return done(null , user);
        }else{
            users.create({
                name: profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            }, function(err, user){
                  if(err){
                    console.log('error in creating user google strategy passport', err);
                    return;

                    return done(null, user);
                  }
            })
        }


    })
  }

))

module.exports = passport;