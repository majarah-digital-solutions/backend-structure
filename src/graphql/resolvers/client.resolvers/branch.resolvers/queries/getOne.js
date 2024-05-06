const { ApolloError } = require("apollo-server-express");
const { Branch } = require("../../../../../models");

const { isValidObjectId } = require("mongoose");

module.exports = async (_,{ id}, {user}) => {

  try {
    if(!isValidObjectId(id)) return new ApolloError("خطا في صيغة المعرف");
    const branch = await Branch.findById(id).populate('parent')
    return branch

  } catch (error) {
    console.log("🚀 ~ module.exports= ~ err:", err)
    return new ApolloError("خطأ في السيرفر");

  }

  
};
