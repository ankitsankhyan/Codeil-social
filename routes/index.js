const express = require('express');

const router = express.Router();

const homecontroller = require('../controller/home_controller');
const samplerouter = require('../controller/sample_controller');

// cho
router.get('/',homecontroller.home);
router.get('/home', homecontroller.home);
router.get('/play',  samplerouter.sample);
router.use('/user', require('./user'));
router.use('/post', require('./post'));
console.log('routes (index.js) connected successfully');

module.exports = router;
