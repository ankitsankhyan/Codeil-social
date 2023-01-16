const express = require('express');

const router = express.Router();


router.use('/post', require('./post'));
router.get('/', function(req, res){
    return res.end('inside index of v1');
})
module.exports = router;