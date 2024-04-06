var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const axios = require("axios");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.listen(3500, () => console.log(`Server running on port 3500`));
// view engine setup

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.post("/bitrix", async (req, res) => {
  console.log(req.body);
  try {
    const response = await axios.post(
      // "https://ihouse.bitrix24.ru/rest/222/8sdi9a5ddmjokdvr/crm.deal.get.json",
      "https://b24-qmabnl.bitrix24.ru/rest/1/0wz3j6inen5i7fyi/crm.deal.get.json",
      { id: req.body.data.FIELDS.ID }
      // { id: req.body.id }
    );
    console.log(response.data.result);
    res.status(200).send("Data sent successfully");
  } catch (error) {
    console.error("Error sending data:", error.message);
    res.status(500).send("Error sending data");
  }
  // return res.json("Success");
});

app.post("/bitrix/create", async (req, res) => {
  try {
    const response = await axios.post(
      "https://b24-qmabnl.bitrix24.ru/rest/1/w0o94m3l9loivssw/crm.deal.add.json",
      // { id: req.body.data.FIELDS.ID }
      { TITLE: req.body.title, OPPORTUNITY: req.body.price }
    );
    // console.log(response.data.result);
    res.status(200).send("Data sent successfully");
  } catch (error) {
    console.error("Error sending data:", error.message);
    res.status(500).send("Error sending data");
  }
  // return res.json("Success");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
