var express = require('express');
var router = express.Router();
var child_process = require('child_process');

/* GET users listing. */
router.post('/png', function (req, res, next) {
    console.log("body: " + res.body)
    if (!res.body) {
        throw new Error("No data in body. Please set context type to plain/text and send DOT")
    }

    return runGraphViz(res.body).then(function () {
        return res.send('Data is: ' + JSON.stringify(req.body) + "\n");
    });
});

function runGraphViz(dot) {
    const cp = child_process.spawn("pwd");
    return new Promise(function (resolve, reject) {
        cp.stdout.on("data", function (data) {
            console.log(data)
        });
        cp.on("exit", function (code, signal) {
            if (code === 0) {
                resolve(code);
            } else {
                reject(code);
            }
        })
    });
}

module.exports = router;
