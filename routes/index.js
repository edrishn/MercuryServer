var express = require("express");
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get("/", function (req, res, next) {
  //Test
  fs.unlink("./data/Product-1.json", function () {});
  fs.readdir("./data", (err, files) => {
    //res.write(files.length);
    console.log(files.length);
  });
  res.write("Test1");
});

module.exports = router;
