var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '5th Seminar HW LEVEL2,3' });
});

router.use('/user', require('./user'));
router.use('/auth', require('./auth'));
router.use('/post', require('./post'));
module.exports = router;
