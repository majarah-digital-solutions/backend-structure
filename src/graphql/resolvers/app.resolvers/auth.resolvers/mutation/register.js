const { ApolloError } = require("apollo-server-express");
const { UsersModel } = require("../../../../../models");
var md5 = require("crypto-js/md5");
const { jwtSign } = require("../../../../../utilities/helpers/encryption");
const {phone : phoneLib} = require('phone');

module.exports = async (
  _,
  { registerData: { phoneNumber, password, fullname: fullnameuser } },
  ctx
) => {
  const phoneObj = phoneLib(phoneNumber, {country: "IL"})
  if(phoneObj.isValid){
    try {
      const userExict = await UsersModel.findOne({ phone: phoneObj.phoneNumber });
      if (!userExict) {
        const hashedPassword = md5(password).toString();
        const user = await UsersModel.create({
          phone: phoneObj.phoneNumber,
          password: hashedPassword,
          fullname: fullnameuser,
        });
        const { _id, avatarUrl, fullname, phone } = user;
        console.log("🚀 ~ user:", user)
        const userData = {
          _id,
          avatarUrl,
          fullname,
          phoneNumber: phone,
        };
        console.log("🚀 ~ userData:", userData)
        const token = jwtSign(userData);
        console.log("🚀 ~ token:", token)
        return { ...userData, token };
      } else {
        return new ApolloError("هذا المستخدم موجود بالفعل");
      }
    } catch (error) {
      console.error("حدث خطا اثناء عمليه التسجيل", error);
      return new ApolloError('حدث خطأ');

    }
  }else {
    return new ApolloError("رقم الهاتف غير صالح");
  }

};
