const express = require('express');

const router = express.Router();


router.use('/post', require('./post'));
router.use('/user',  require('./user'));
router.get('/', function(req, res){
    return res.end('inside index of v1');
})
module.exports = router;