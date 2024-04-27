const { ApolloError } = require("apollo-server-express");
const { UsersModel } = require("../../../../../models");
var md5 = require("crypto-js/md5");
const { jwtSign } = require("../../../../../utilities/helpers/encryption");
const { phone } = require("phone");

module.exports = async (_, { loginData: { phoneNumber, password } }, ctx) => {
  const phoneObj = phone(phoneNumber, { country: "IL" });
  if (phoneObj.isValid) {
    console.log("🚀 ~ phoneObj:", phoneObj)
    
    password = md5(password).toString();
    console.log("🚀 ~ module.exports= ~ password:", password)
    const user = await UsersModel.findOne({
      phone: phoneObj.phoneNumber,
      password,
      admin: true,
    });
    console.log("🚀 ~ module.exports= ~ user:", user)

    if (user) {
      const { _id, avatarUrl, fullname, phone } = user;
      const userData = {
        _id,
        avatarUrl,
        fullname,
        phoneNumber: phone,
      };
      const token = jwtSign(userData);
      return { ...userData, token };
    } else {
      return new ApolloError(" خطا في رقم الهاتف  او رمز المرور");
    }
  } else {
    return new ApolloError("رقم المرور غير صالح");
  }
};
