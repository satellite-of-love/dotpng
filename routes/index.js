var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* healthcheck. */
router.get('/health', function (req, res, next) {
  res.send(`{ "status": "I'm OK" }`);
});

/* more healthcheck. */
router.get('/info', function (req, res, next) {
  res.send(`{ "whoami": "My job is to run graphviz, and give you a URL to an image. post DOT as text/plain to /dot/png" }`);
});

module.exports = router;
