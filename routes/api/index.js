const express = require('express');

const router = express.Router();


router.use('/v1', require('./v1'))
router.get('/' , function(req, res){
    return res.end('inside the index of api');
})
module.exports = router;