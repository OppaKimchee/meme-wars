const express = require('express');
const router = express.Router();
const posts = require('../../controllers/posts');

router.get('/', posts.index);
router.post('/submit', posts.submit);

module.exports = router;