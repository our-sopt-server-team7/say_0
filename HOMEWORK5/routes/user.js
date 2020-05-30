var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/profile/:id', userController.readProfile);

module.exports = router;