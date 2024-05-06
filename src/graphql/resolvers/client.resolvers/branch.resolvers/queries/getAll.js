const { ApolloError } = require("apollo-server-express");
const {  Branch } = require("../../../../../models");
const { pagination } = require("../../../../../config/constants");

module.exports = async (_,{ page = pagination.page, limit = pagination.limit }, {user}) => {

  try {
    const skip = (page - 1) * limit;
    const branches = await Branch.find().populate('parent').skip(skip).limit(limit).sort({createdAt:-1});
    return branches

  } catch (error) {
    console.log("🚀 ~ module.exports= ~ err:", err)
    return new ApolloError("خطأ في السيرفر");

  }

  
};
