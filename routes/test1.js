var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('test1', { title: 'Test1' });
});

module.exports = router;
