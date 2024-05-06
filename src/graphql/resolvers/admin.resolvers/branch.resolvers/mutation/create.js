const { ApolloError } = require("apollo-server-express");
const {  Branch } = require("../../../../../models");

module.exports = async (_, { createData: {title,parent,description,isMain,icon}}, {user}) => {
  if(!user) return new ApolloError('يجب تسجيل الدخول اولا')
  try {
    if(!isMain){
      if(!parent) return new ApolloError('يجب ان يحتوي علي عنصر اكبر')
      if(!await Branch.findById(parent)) return new ApolloError('لا يوجد شعبة بهذا المعرف')
    }

    const branch = await Branch.create({title,parent,description,isMain,icon})
    if(!branch) return new ApolloError('خطا في البيانات')
    return branch;
  } catch (error) {
    console.log("🚀 ~ module.exports= ~ err:", err)
    return new ApolloError("خطأ في السيرفر");
  }
};
