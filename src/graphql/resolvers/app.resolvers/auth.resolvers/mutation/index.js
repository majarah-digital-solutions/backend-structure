const { formatters: { Prefixer },} = require("../../../../../utilities/index");
const { prefix } = require("../config.js");

Prefixer.setPrefix(prefix);

module.exports = {
  [Prefixer.addPrefix("Register")]: require("./register"),
  [Prefixer.addPrefix("Login")]: require("./login"),
  [Prefixer.addPrefix("SendOTP")]: require("./sendOTP"),
  [Prefixer.addPrefix("CheckOTP")]: require("./checkOTP"),
  [Prefixer.addPrefix("ExistPhoneNumber")]: require("./existPhoneNumber"),
};
