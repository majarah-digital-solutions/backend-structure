const { ApolloError } = require("apollo-server-express");
const { User } = require("../../../../../models");
var md5 = require("crypto-js/md5");
const { jwtSign } = require("../../../../../utilities/helpers/encryption");
const phoneNumbers = require("../../../../../utilities/formatters/phoneNumbers");
const { USERS_ROLES } = require("../../../../../config/constants");

module.exports = async (_, { loginData: { phoneNumber, password } }, ctx) => {

  try {
    const phoneObj =  phoneNumbers.egyptFormat(phoneNumber)
    if(!phoneObj.isValid) return new ApolloError('رقم هاتف غير صالح')
    
    password = md5(password).toString();
    const user = await User.findOne({
      phone: phoneObj.phoneNumber,
      password,
    });

    if(!user)   return new ApolloError(" خطا في رقم الهاتف  او كلمة المرور");
    if(user.role != USERS_ROLES.ADMIN) return new ApolloError('ليس لديك الصلاحيات')
    
    const { _id, fullname, phone ,role } = user;
          const userData = {
        _id,
        fullname,
        phone,
        role
      };
      return {
        success: true,
        message: "تم تسجيل الدخول بنجاح",
        data: 
          userData
        ,
        token: jwtSign(userData)
    };
    
  } catch (error) {
    console.error("حدث خطا اثناء عمليه التسجيل", error);
    return new ApolloError('حدث خطأ');

  }

  
};
