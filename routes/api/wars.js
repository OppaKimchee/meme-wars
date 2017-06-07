const express = require('express');
const router = express.Router();
const wars = require('../../controllers/war');

router.get('/', wars.index);
router.post('/war', wars.createWar);

module.exports = router;