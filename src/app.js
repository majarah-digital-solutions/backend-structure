var express = require("express");

var app = express();

require("./config/notfication");
require("./config/database");
require("./middlewares/index.moiddleware")(app, express);


module.exports = app;
