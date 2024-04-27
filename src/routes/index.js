var express = require('express');
var app = express();
var config = require('./config/router.js')

/* GET home page. */
app.use("/config", config)


module.exports = app;
