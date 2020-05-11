var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    const result = {
        status : 200,
        message : 'users~'
    }
    res.status(200).send(result);
});

router.use('/login',require('./login')); //level3
router.use('/signup',require('./signup')); //level3

module.exports = router;