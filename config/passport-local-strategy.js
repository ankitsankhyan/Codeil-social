const User = require('../model/user');

const passort = require('passport');
const passport = require('passport');

const localstratagy = require('passport-local').Strategy;

passort.use(new localstratagy({
    usernameField: 'email'
},  function(email, password, done){
    User.findOne({email : email}, function(err, user){
        if(err){
            console.log('error is there');
            return done(err);
        }

        if(!user || (user.password != password)){
           return done(null, false);
        }

        return done(null, user);
    });
}))

passort.serializeUser(function(user,done){
    done(null, user.id);
})

passort.deserializeUser(function(user, done){
    User.findById(user.id, function(err, user){
      if(err){
        console.log('Error in finding user --> passport');
        done(err);
      }
       return done(null, user);
    })
});

// check if user is authenticated 
// this is used as middleware only
  passort.checkAuthentication = function(req, res, next){
    // if user is present then pass to the next i.e controller action
    if(req.isAuthenticated()){
        return next();
    }else{
        return res.redirect('/user/sign-in');
    }
  }

//   if user is already signed in

passort.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }

    next();
}
module.exports = passport;