const express = require('express');

const router = express.Router();


const user_profile = require('../controller/user_controller');



router.get('/', user_profile.profile);
router.get('/fav', user_profile.favarate_sport);
router.get('/sign_in', user_profile.sign_in);
module.exports = router;