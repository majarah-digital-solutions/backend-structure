const { default: mongoose } = require("mongoose");
const {
  userSchema,
  otpSchema,
  translationSchema,
  settingSchema,
  languageSchema
  
} = require("./schemas");

module.exports = {

  User: mongoose.model("User", userSchema),
  Otp: mongoose.model('Otp', otpSchema),
  Setting: mongoose.model("Settings", settingSchema),
  Translation: mongoose.model("Translation", translationSchema),
  Language: mongoose.model("Language",   languageSchema),

};
