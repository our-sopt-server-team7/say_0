var express = require('express');
var router = express.Router();

router.use('/user', require('./user'));
//'~/user'로 들어올 경우에 index.js가 있는 파일에서 user라는 이름을 가진 파일을 모듈로 가져온다. user.js로 라우팅이 넘어감.
router.use('/post', require('./post'));

module.exports = router;