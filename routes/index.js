const express = require('express');

const router = express.Router();

const homecontroller = require('../controller/home_controller');
const samplerouter = require('../controller/sample_controller');

// cho
router.get('/',homecontroller.home);
router.get('/play',  samplerouter.sample);
console.log('routes connected successfully');

module.exports = router;