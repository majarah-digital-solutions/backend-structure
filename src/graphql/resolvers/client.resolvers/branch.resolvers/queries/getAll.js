const { ApolloError } = require("apollo-server-express");
const {  Branch } = require("../../../../../models");

module.exports = async (_,{ pagination: { limit, page }}, {user}) => {

  try {
    if (!limit) limit = 10;
    if (!page) page = 1;
    const skip = (page - 1) * limit;
    const branches = await Branch.find().populate('parent').skip(skip).limit(limit).sort({createdAt:-1});
    return branches

  } catch (error) {
    console.error("حدث خطا اثناء عمليه التسجيل", error);
    return new ApolloError('حدث خطأ');

  }

  
};
