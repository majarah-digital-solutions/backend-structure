const { ApolloError } = require("apollo-server-express");
const {  Branch } = require("../../../../../models");

module.exports = async (_,{ pagination: { limit, page } ,title}, {user}) => {

  try {
    if (!limit) limit = 10;
    if (!page) page = 1;
    const skip = (page - 1) * limit;
    let query 
    if(title) query = {title:{$regex:title,$options: 'i'}}
    const branches = await Branch.find(query).populate('parent').skip(skip).limit(limit).sort({createdAt:-1});
    return branches

  } catch (error) {
    console.error("حدث خطا اثناء عمليه التسجيل", error);
    return new ApolloError('حدث خطأ');

  }

  
};
