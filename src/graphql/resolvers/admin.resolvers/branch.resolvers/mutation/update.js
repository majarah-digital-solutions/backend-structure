const { ApolloError } = require("apollo-server-express");
const { App, Branch } = require("../../../../../models");
const { isValidObjectId } = require("mongoose");

module.exports = async (_, { updateData: {_id,title,parent,description,isMain,icon}}, {user}) => {
  if(!user) return new ApolloError('يجب تسجيل الدخول اولا')
  try {
    if(!isValidObjectId(_id)) return new ApolloError('خطا في صيغة المعرف')
    const branch = await Branch.findById(_id)
    if(!branch) return new ApolloError('لا يوجد شعبة بهذا المعرف')

    if(title) branch.title = title
    if(icon) branch.icon = icon
    if(description) branch.description = description

  
    await branch.save()
    return branch;
  } catch (error) {
    console.log("🚀 ~ module.exports= ~ err:", err)
    return new ApolloError("خطأ في السيرفر");
  }

};
