var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var GetByIdRouter = require("./routes/GetById");
var SaveChanges = require("./routes/SaveChanges");

var { createMiddleware } = require("@mswjs/http-middleware");

var app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/Server/Services/Entity/GetById", createMiddleware(GetByIdRouter));
app.use("/Server/Services/Entity/SaveChanges", createMiddleware(SaveChanges));

var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
