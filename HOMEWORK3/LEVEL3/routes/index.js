var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '3rd Seminar HW LEVEL3'});
});

router.use('/post', require('./post'));
module.exports = router;
