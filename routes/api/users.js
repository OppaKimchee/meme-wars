const express = require('express');
const router = express.Router();
const users = require('../../controllers/users');

router.post('/authed', users.authed);

module.exports = router;