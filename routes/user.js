const express = require('express');

const router = express.Router();
const passport =  require('passport');

const user_profile = require('../controller/user_controller');
const homecontroller = require('../controller/home_controller');

router.get('/',passport.checkAuthentication, user_profile.profile);

router.get('/fav', user_profile.favarate_sport);

// checking prior login in user_profile using passport as middleware

router.get('/sign-in',passport.priorLogin, user_profile.signIn);
router.get('/sign-up',passport.priorLogin, user_profile.signup)



router.post('/create', user_profile.create);

// here we will be using passport middleware
// using those set function passport firstly authenticate the user-id and password and if not found then failure redirect will happen otherwise 3rd parameter is called
router.post('/create-session',passport.authenticate(
    'local',{failureRedirect:'/user/sign-in'},
),user_profile.createSession );

router.get('/sign-out', user_profile.destroySession);

router.get('/profile',passport.checkAuthentication,user_profile.profile);
console.log('user route are connected successfully');
module.exports = router;