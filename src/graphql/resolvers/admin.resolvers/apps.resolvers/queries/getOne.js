const { ApolloError } = require("apollo-server-express");
const { App } = require("../../../../../models");

const { isValidObjectId } = require("mongoose");

module.exports = async (_,{ _id}, {user}) => {

  try {
    if(!isValidObjectId(_id)) return new ApolloError("خطا في صيغة المعرف");
    const app = await App.findById(_id).populate('branch')
    return app
  } catch (error) {
    console.error("حدث خطا اثناء جلب المعلومات", error);
    return new ApolloError('حدث خطأ');
  }
};
