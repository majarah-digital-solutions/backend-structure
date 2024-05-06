const { ApolloError } = require("apollo-server-express");
const {  Branch } = require("../../../../../models");
const { pagination } = require("../../../../../config/constants");

module.exports = async (_,{ page = pagination.page, limit = pagination.limit  ,title}, {user}) => {

  try {
    const skip = (page - 1) * limit;
    let query 
    if(title) query = {title:{$regex:title,$options: 'i'}}
    const branches = await Branch.find(query).populate('parent').skip(skip).limit(limit).sort({createdAt:-1});
    return branches

  } catch (error) {
    console.error("حدث خطا اثناء جلب الفئات ", error);
    return new ApolloError('حدث خطأ');
  }

};
