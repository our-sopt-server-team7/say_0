var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    const result = {
        status : 200,
        message : 'blog~'
    }
    res.status(200).send(result);
});

router.use('/post',require('./post')); //level2,3

module.exports=router;