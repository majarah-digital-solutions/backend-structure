const { ApolloError } = require("apollo-server-express");
const { UsersModel } = require("../../../../../models");
var md5 = require("crypto-js/md5");
const { jwtSign } = require("../../../../../utilities/helpers/encryption");
const { phone } = require("phone");

module.exports = async (_, { loginData: { phoneNumber, password } }, ctx) => {
  const phoneObj = phone(phoneNumber, { country: "IL" });

  if (phoneObj.isValid) {
    password = md5(password).toString();
    const user = await UsersModel.findOne({
      phone: phoneObj.phoneNumber,
      password,
    });

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
