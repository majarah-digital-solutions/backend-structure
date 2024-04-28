const { ApolloError } = require("apollo-server-express");
const { App, Branch } = require("../../../../../models");

module.exports = async (_, { createData: {name,logo,description,branch}}, {user}) => {
  if(!user) return new ApolloError('يجب تسجيل الدخول اولا')
  try {
    if(!await Branch.findById(branch)) return new ApolloError("لا توجد شعبة ب هذا المعرف")
    const app = await App.create({name,logo,description,branch,user:user._id})
    if(!app) return new ApolloError('خطا في البيانات')
    return app;
  } catch (error) {
    return new ApolloError("خطا في انشاء الحساب",error)
  }
};
