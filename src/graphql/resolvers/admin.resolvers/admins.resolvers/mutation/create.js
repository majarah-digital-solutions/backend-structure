const { ApolloError } = require("apollo-server-express");
const { USERS_ROLES } = require("../../../../../config/constants");
const phoneNumbers = require("../../../../../utilities/formatters/phoneNumbers");
var md5 = require("crypto-js/md5");
const { User } = require("../../../../../models");
const { jwtSign } = require("../../../../../utilities/helpers/encryption");

module.exports = async (_, args, {pubsub, user}) => {
    if(!user) return new ApolloError("يجب تسجيل الدخول أولا");
    try {
      if(user.role != USERS_ROLES.ADMIN) return new ApolloError('ليس لديك الصلاحيات')
        const { registerData: { fullname, phoneNumber,password }} = args

        const phoneObj =  phoneNumbers.egyptFormat(phoneNumber)
        if(!phoneObj.isValid) return new ApolloError('رقم هاتف غير صالح')
        

      // check if user Exist By Phone Number
      const userExist = await User.findOne({ phone: phoneObj.phoneNumber });
      if(userExist) return new ApolloError("هذا الرقم مستخدم بالفعل");
      
      
      const hashedPassword = md5(password).toString();

      const data = {fullname, phone:phoneObj.phoneNumber,password:hashedPassword, role:USERS_ROLES.ADMIN}

    
        const newAdmin = new User(data)
        await newAdmin.save()

        const { _id, phone ,role} = newAdmin;
        const userData = {_id ,fullname,phone,role};
        
         return {
          success: true,
          message: "تم تسجيل الادمن بنجاح",
          data: 
            userData
          ,
          token: jwtSign(userData)
      };
    }
    catch(err) {
        console.log("🚀 ~ module.exports= ~ err:", err)
        return new ApolloError("خطأ في السيرفر");
    }
};
