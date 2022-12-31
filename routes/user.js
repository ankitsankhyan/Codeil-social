const express = require('express');

const router = express.Router();
const passort =  require('passport');

const user_profile = require('../controller/user_controller');
const homecontroller = require('../controller/home_controller');

router.get('/', homecontroller.home);
router.get('/profile',passort.checkAuthentication ,user_profile.profile);
router.get('/fav', user_profile.favarate_sport);
router.get('/sign-in', user_profile.signIn);

router.get('/sign-up', user_profile.signup)
router.post('/create', user_profile.create);

// here we will be using passport middleware
// using those set function passport firstly authenticate the user-id and password and if not found then failure redirect will happen otherwise 3rd parameter is called
router.post('/create-session',passort.authenticate(
    'local',{failureRedirect:'/user/sign-in'},
),user_profile.createSession );
module.exports = router;