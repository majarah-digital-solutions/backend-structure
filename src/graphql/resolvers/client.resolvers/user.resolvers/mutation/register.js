const { ApolloError } = require("apollo-server-express");
const {  User } = require("../../../../../models");
var md5 = require("crypto-js/md5");
const { jwtSign } = require("../../../../../utilities/helpers/encryption");
const phoneNumbers = require("../../../../../utilities/formatters/phoneNumbers");

module.exports = async (
  _,
  { registerData: { phoneNumber, password, fullname:userName } },
  ctx
) => {
  const phoneObj =  phoneNumbers.egyptFormat(phoneNumber)
  if(!phoneObj.isValid) return new ApolloError('رقم هاتف غير صالح')
  

    try {
      
      // check if user Exist By Phone Number
      const userExist = await User.findOne({ phone: phoneObj.phoneNumber });
      if(userExist) return new ApolloError("هذا الرقم مستخدم بالفعل");
      
      
      //* Hashed Password
      const hashedPassword = md5(password).toString();
    
      //* Create Account
      const user = await User.create({
        phone: phoneObj.phoneNumber,
        password: hashedPassword,
        fullname:userName,
      });
      //* Token Data
      const { _id, fullname, phone } = user;
      const userData = {_id ,fullname,phone};

      return {
        success: true,
        message: "تم تسجيل المستخدم بنجاح",
        data: 
          userData
        ,
        token: jwtSign(  userData   )
    };

    } catch (error) {
      console.error("حدث خطا اثناء عمليه التسجيل", error);
      return new ApolloError('حدث خطأ');

    }
  }


