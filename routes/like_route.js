const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();

const like = require('../controller/like_controller');



router.get('/create', passport.checkAuthentication, like.toggleLike);


module.exports = router;


