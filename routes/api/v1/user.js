const express = require('express');

const router = express.Router();

const createSession = require('../../../controller/api/v1/users_api');

router.get('/create-session', createSession.createSession)


module.exports = router;