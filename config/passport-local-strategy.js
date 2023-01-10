const User = require('../model/user');

const passport = require('passport');

const localstratagy = require('passport-local').Strategy;

passport.use(new localstratagy({
    usernameField: 'email',
    passReqToCallback:true
},  function(req,email, password, done){
    User.findOne({email : email}, function(err, user){
        if(err){
            req.flash('error', err);
            console.log('error is there');
            return done(err);
        }

        if(!user || (user.password != password)){
            req.flash('error', 'Invalid user name / password');
           return done(null, false);
        }

        return done(null, user);
    });
}))

// put user id in cookie in encrypted manner

passport.serializeUser(function(user,done){
    done(null, user.id);
})
 

// deserializeUser takes id as input and find corresponding user which is passed in request

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      if(err){
        console.log('Error in finding user --> passport');
        done(err);
      }
       return done(null, user);
    })
});

// check if user is authenticated 
// this is used as middleware only

passport.checkAuthentication = function(req, res, next){
    
    // if user is present then pass to the next function i.e controller action

    if(req.isAuthenticated()){
        return next();
    }
       
    // if the user is not signed in

    return res.redirect('/user/sign-in');
    
  }

//   if user is already signed in

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){

        // users data is sent to the response from req.user which is managed by (passport)

        res.locals.user = req.user;
    }

    next();
}

// this function is used if user is not login then user is send to signin otherwise profile page will be given

passport.priorLogin = function(req, res, next){
    if(!req.isAuthenticated()){
        next();
    }else{
        return res.redirect('/user/profile');
    }

   
}
module.exports = passport;