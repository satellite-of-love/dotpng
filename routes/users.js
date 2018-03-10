var express = require('express');
var router = express.Router();
const { spawn } = require('child_process');
var sha1 = require('./sha');

// curl http://localhost:3000/dot/png -X POST -H "Content-Type: text/plain" -d "digraph Post { la -> ha }"

/* GET users listing. */
router.post('/png', function (req, res, next) {
  const dot = req.body;
  console.log("Body is: " + req.body);

  if (!req.body) {
    throw new Error("No body seen on request. Set content type to text/plain and send DOT")
  }
  const shaOfData = sha1(dot);

  const cp = spawn("pwd");
  cp.stdout.on("data", function(data) { console.log("stdout: " + data)});
  cp.on("exit", function(code, signal) {
      res.send('Code is: ' + code + ' sha is: ' + shaOfData + "\n");
  });
});

module.exports = router;
