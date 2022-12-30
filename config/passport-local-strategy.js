const User = require('../model/user');

const passort = require('passport');

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
    user.findById(id, function(err, user){
      if(err){
        console.log('Error in finding user --> passport');
        done(err);
      }
       return done(null, user);
    })
});