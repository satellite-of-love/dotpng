var express = require('express');
var router = express.Router();
const { spawn } = require('child_process');
var sha1 = require('./sha');
var fs = require('fs');

// curl http://localhost:3000/dot/png -X POST -H "Content-Type: text/plain" -d "digraph Post { la -> ha }"

/* 
* POST
* make an image and return a URL for fetching that image
 */
router.post('/png', function (req, res, next) {
    const dot = req.body;
    console.log("Body is: " + req.body);

    if (!req.body) {
        throw new Error("No body seen on request. Set content type to text/plain and send DOT")
    }
    const shaOfData = sha1(dot);
    console.log("sha is: " + shaOfData);

    const filename = "public/images/" + shaOfData + ".png";
    const urlToFile = "images/" + shaOfData + ".png";

    if (fs.existsSync(filename)) {
        console.log("already exists: " + filename);
        return res.json({ goalGraphUrl: urlToFile, cached: true });
    }
    console.log("No file found. Generating one with `dot`");
    try {
        const cp = spawn("dot", ["-Tpng", "-o", filename]);
        if (!cp) {
            console.log("Wtf happened to spawn!");
        }
        cp.stdin.write(dot);
        cp.stdin.end();
        console.log("Wrote to stdin");
        cp.stdout.on("data", function (data) {
            console.log("stdout: " + data)
        });
        var stderr = "";
        cp.stderr.on("data", function (data) {
            console.log("stderr: " + data);
            stderr = stderr + data;
        });
        cp.on("exit", function (code, signal) {
            if (code !== 0) {
                res.status(500).send("Failure running dot: " + stderr);
                return;
            }
            res.json({ goalGraphUrl: urlToFile, cached: false });
        });
    } catch (e) {
        console.log("error: " + e.message);
        console.log("stack: " + e.stack);
        res.status(500).send("wtf");
    }
});

module.exports = router;
