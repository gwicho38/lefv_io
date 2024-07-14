var logger = require('morgan');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/test', function (req, res, next) {
  logger.log("test");
  res.render('index', { title: 'lefv' });

});

module.exports = router;
