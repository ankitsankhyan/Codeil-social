const express = require('express');

const router = express.Router();
const post = require('../../../controller/api/v1/post');

router.get('/', post.index );
router.delete('/delete/:id', post.destroy);
module.exports = router;