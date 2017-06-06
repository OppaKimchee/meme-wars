const express = require('express');
const router = express.Router();
const posts = require('../../controllers/posts');

router.get('/api/posts', posts.index);

module.exports = router;