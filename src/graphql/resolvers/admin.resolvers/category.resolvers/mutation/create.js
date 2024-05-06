const { ApolloError } = require("apollo-server-express");
const { App, Category } = require("../../../../../models");

module.exports = async (_, { createData: {title,icon,description,app}}, {user}) => {
  if(!user) return new ApolloError('يجب تسجيل الدخول اولا')
  try {
      const application = await App.findById(app)
      if(!application) return new ApolloError('لا يوجد تطبيق بهذا المعرف')
      if(await Category.findOne({title})) return new ApolloError('يوجد فئة بنفس العنوان')
      const category = await Category.create({title,app,description,icon})
      if(!category) return new ApolloError('خطا في البيانات')
      return category;
  } catch (error) {
    console.log("🚀 ~ module.exports= ~ err:", err)
    return new ApolloError("خطأ في السيرفر");
  }
};
