const { ApolloError } = require("apollo-server-express");
const {  App } = require("../../../../../models");

module.exports = async (_,{ pagination: { limit, page }}, {user}) => {

  try {
    if (!limit) limit = 10;
    if (!page) page = 1;
    const skip = (page - 1) * limit;
    const apps = await App.find({user:user._id}).populate('branch').skip(skip).limit(limit).sort({createdAt:-1});
    return apps

  } catch (error) {
    console.error("حدث خطا اثناء جلب المعلومات", error);
    return new ApolloError('حدث خطأ');

  }

  
};
