const { default: mongoose } = require("mongoose");
const {
  userSchema,
  otpSchema,
  translationSchema,
  settingSchema,
  languageSchema,
  appSchema,
  branchSchema
  
} = require("./schemas");

module.exports = {

  User: mongoose.model("User", userSchema),
  Otp: mongoose.model('Otp', otpSchema),
  Setting: mongoose.model("Setting", settingSchema),
  Translation: mongoose.model("Translation",translationSchema),
  Language: mongoose.model("Language", languageSchema),
  App: mongoose.model("App", appSchema),
  Branch: mongoose.model("Branch", branchSchema),

};
