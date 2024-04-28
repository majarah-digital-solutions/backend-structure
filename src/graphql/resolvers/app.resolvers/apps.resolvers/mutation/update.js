const { ApolloError } = require("apollo-server-express");
const { App, Branch } = require("../../../../../models");
const { isValidObjectId } = require("mongoose");

module.exports = async (_, { updateData: {_id,name,logo,description,branch}}, {user}) => {
  if(!user) return new ApolloError('يجب تسجيل الدخول اولا')
  try {
    if(!isValidObjectId(_id)) return new ApolloError('خطا في صيغة المعرف')
    
    const app = await App.findOne({_id,user:user._id})
    if(!app) return new ApolloError('لا يوجد تطبيق للمعرف')
    if(branch){
      if(!await Branch.findById(branch)) return new ApolloError("لا توجد شعبة ب هذا المعرف")
      app.branch = branch
    }
    if(name) app.name = name
    if(logo) app.logo = logo
    if(description) app.description = description
    await app.save()
    return app;
  } catch (error) {
    return new ApolloError("خطا في تعديل الحساب",error)
  }

};
