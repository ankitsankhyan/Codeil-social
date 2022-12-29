const express = require('express');

const router = express.Router();


const user_profile = require('../controller/user_controller');



router.get('/', user_profile.profile);
router.get('/fav', user_profile.favarate_sport);

module.exports = router;