const { ApolloError } = require("apollo-server-express");
const {  App } = require("../../../../../models");
const { pagination } = require("../../../../../config/constants");

module.exports = async (_,{ page = pagination.page, limit = pagination.limit ,name}, {user}) => {

  try {

    const skip = (page - 1) * limit;
    let query 
    if(name) query = {name:{$regex:name,$options: 'i'}}
    const apps = await App.find(query).populate('branch').skip(skip).limit(limit).sort({createdAt:-1});
    return apps

  } catch (error) {
    console.log("🚀 ~ module.exports= ~ err:", err)
    return new ApolloError("خطأ في السيرفر");

  }
};
