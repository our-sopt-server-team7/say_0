const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const AuthMiddleware = require('../middlewares/auth');
const upload = require('../modules/multer');

/*
const multer = require('multer');
const upload = multer({
    dest: 'upload/' //어떤 폴더에 저장할지 (없으면 생성함)
});
*/

router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);

/* 
    ✔️ update profile
    METHOD : POST
    URI : localhost:3000/user/profile
    REQUEST HEADER : JWT
    REQUEST BODY : ⭐️image file⭐️
    RESPONSE DATA : user profile
*/
router.post('/profile', AuthMiddleware.checkToken, upload.single('profile'), UserController.updateProfile);

/* 
    ✔️ update profile
    METHOD : POST
    URI : localhost:3000/user/selfies
    REQUEST HEADER : JWT
    REQUEST BODY : ⭐️image file⭐️
    RESPONSE DATA : user profile
*/
router.post('/selfies', AuthMiddleware.checkToken, upload.array('images', 6), UserController.array);

module.exports = router;