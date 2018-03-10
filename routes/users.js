var express = require('express');
var router = express.Router();
const { spawn } = require('child_process');
var sha1 = require('./sha');
var fs = require('fs');

// curl http://localhost:3000/dot/png -X POST -H "Content-Type: text/plain" -d "digraph Post { la -> ha }"

/* GET users listing. */
router.post('/png', function (req, res, next) {
  const dot = req.body;
  console.log("Body is: " + req.body);

  if (!req.body) {
    throw new Error("No body seen on request. Set content type to text/plain and send DOT")
  }
  const shaOfData = sha1(dot);

  const filename = "public/images/" + shaOfData + ".png";

  if (fs.existsSync(filename)) {
    return res.redirect(filename);
  }

  const cp = spawn("dot", ["-Tpng", "-o", filename]);
  cp.stdin.write(dot);
  cp.stdin.end();
  cp.stdout.on("data", function(data) { console.log("stdout: " + data)});
  cp.on("exit", function(code, signal) {
      res.redirect(filename);
  });
});

module.exports = router;
