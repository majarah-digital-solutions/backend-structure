const { ApolloError } = require("apollo-server-express");
const {  App } = require("../../../../../models");

module.exports = async (_,{ pagination: { limit, page } ,name}, {user}) => {

  try {
    if (!limit) limit = 10;
    if (!page) page = 1;
    const skip = (page - 1) * limit;
    let query 
    if(name) query = {name:{$regex:name,$options: 'i'}}
    const apps = await App.find(query).populate('branch').skip(skip).limit(limit).sort({createdAt:-1});
    return apps

  } catch (error) {
    console.error("حدث خطا اثناء عمليه التسجيل", error);
    return new ApolloError('حدث خطأ');

  }
};
