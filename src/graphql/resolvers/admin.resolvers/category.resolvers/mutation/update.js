const { ApolloError } = require("apollo-server-express");
const { App, Category } = require("../../../../../models");
const { categoryStatus } = require("../../../../../config/constants");

module.exports = async (_, { createData: {_id,title,icon,description,app,status}}, {user}) => {
  if(!user) return new ApolloError('يجب تسجيل الدخول اولا')
  try {
      const category = await Category.findById(_id)
      if(!category) return new ApolloError('لا يوجد فئة بهذا المعرف')
      if(title){
        if(await Category.findOne({title})) return new ApolloError('يوجد فئة بنفس العنوان')
        category.title = title
      }
      if(app) {
        if(!await App.findById(app)) return new ApolloError('لا يوجد برنامج لهذا المعرف')
        category.app = app
      }
      if(icon) category.icon = icon
      if(description) category.description = description
      if(status && Object.values(categoryStatus).includes(status)) category.status = status
      await category.save()
      if(!category) return new ApolloError('خطا في البيانات')
      return category;
  } catch (error) {
    console.log("🚀 ~ module.exports= ~ err:", err)
    return new ApolloError("خطأ في السيرفر");
  }
};
