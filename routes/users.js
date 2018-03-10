var express = require('express');
var router = express.Router();
const { spawn } = require('child_process');

// curl http://localhost:3000/dot/png -X POST -H "Content-Type: text/plain" -d "digraph Post { la -> ha }"

/* GET users listing. */
router.post('/png', function (req, res, next) {
  res.send('Data is: ' + JSON.stringify(req.body) + "\n");
});

module.exports = router;
