const express = require('express');
const passport = require('passport');

const router = express.Router();
const post = require('../../../controller/api/v1/post');

router.get('/', post.index );
router.delete('/delete/:id',passport.authenticate('jwt',{session:false}), post.destroy);
module.exports = router;