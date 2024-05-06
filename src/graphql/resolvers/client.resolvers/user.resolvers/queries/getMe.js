const { ApolloError } = require("apollo-server-express");

module.exports = async (_,  args, {user}) => {
  if(!user) return new ApolloError('يجب تسجيل الدخول اولا')
  try {
    return user
  } catch (error) {
    console.log("🚀 ~ module.exports= ~ err:", err)
    return new ApolloError("خطأ في السيرفر");
  }
};
