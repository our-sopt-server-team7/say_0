var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '4th Seminar HW LEVEL1,2' });
});

router.use('/user', require('./user'));
module.exports = router;