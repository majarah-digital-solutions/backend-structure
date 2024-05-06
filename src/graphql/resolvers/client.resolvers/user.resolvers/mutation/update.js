const { ApolloError } = require("apollo-server-express");
const {  User } = require("../../../../../models");
const phoneNumbers = require("../../../../../utilities/formatters/phoneNumbers");

module.exports = async (
  _,
  { updateData: { phoneNumber, fullname:userName } },
  {user}
  
) => {
  try {
    const account = await User.findById(user._id)

    if(phoneNumber){
      const phoneObj =  phoneNumbers.egyptFormat(phoneNumber)
      if(!phoneObj.isValid) return new ApolloError('رقم هاتف غير صالح')
      if(await User.findOne({phone:phoneObj.phoneNumber})) return new ApolloError('رقم هاتف مستخدم من قبل')
      account.phone = phoneObj.phoneNumber  
    }
      if(userName)account.fullname = userName
      //* save update 
      await account.save()

      return account
    } catch (error) {
      console.log("🚀 ~ module.exports= ~ err:", err)
      return new ApolloError("خطأ في السيرفر");

    }
  }


