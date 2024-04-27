const { ApolloError } = require("apollo-server-express");
const { User } = require("../../../../../models");
var md5 = require("crypto-js/md5");
const { jwtSign } = require("../../../../../utilities/helpers/encryption");
const phoneNumbers = require("../../../../../utilities/formatters/phoneNumbers");

module.exports = async (_,  args, {user}) => {

  if(!user) return new ApolloError('يجب تسجيل الدخول اولا')
  try {
    return user
  } catch (error) {
    console.error("حدث خطا اثناء عمليه التسجيل", error);
    return new ApolloError('حدث خطأ');

  }

  
};
