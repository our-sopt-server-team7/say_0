const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/local', authController.checkToken);

module.exports = router;