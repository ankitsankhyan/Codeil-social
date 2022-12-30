const express = require('express');

const router = express.Router();


const user_profile = require('../controller/user_controller');
const homecontroller = require('../controller/home_controller');

router.get('/', homecontroller.home);
router.get('/profile', user_profile.profile);
router.get('/fav', user_profile.favarate_sport);
router.get('/sign-in', user_profile.signIn);

router.get('/sign-up', user_profile.signup)
router.post('/create', user_profile.create);
module.exports = router;