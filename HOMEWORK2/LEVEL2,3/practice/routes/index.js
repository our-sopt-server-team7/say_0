var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/api', require('./api'));
router.use('/api/blog/post', require('./api/blog/post')); //level2,3
router.use('/api/users/login', require('./api/users/login')); //level3
router.use('/api/users/signup', require('./api/users/signup')); //level3

module.exports = router;
