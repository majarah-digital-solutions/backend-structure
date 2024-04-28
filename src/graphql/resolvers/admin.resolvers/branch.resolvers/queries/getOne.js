const { ApolloError } = require("apollo-server-express");
const { Branch } = require("../../../../../models");

const { isValidObjectId } = require("mongoose");

module.exports = async (_,{ _id}, {user}) => {

  try {
    if(!isValidObjectId(_id)) return new ApolloError("خطا في صيغة المعرف");
    const branches = await Branch.findById(_id).populate('parent')
    return branches

  } catch (error) {
    console.error("حدث خطا اثناء عمليه التسجيل", error);
    return new ApolloError('حدث خطأ');

  }

  
};
