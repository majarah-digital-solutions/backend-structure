const { ApolloError } = require("apollo-server-express");
const {  Branch } = require("../../../../../models");
const { isValidObjectId } = require("mongoose");

module.exports = async (_, {_id}, {user}) => {
  if(!user) return new ApolloError('يجب تسجيل الدخول اولا')
  try {
    if(!isValidObjectId(_id)) return new ApolloError('خطا في صيغة المعرف')

    const branch = await Branch.findOneAndDelete({_id})
    if(!branch) return new ApolloError('لا يوجد شعبة بهذا المعرف')
    return true;
  } catch (error) {
    return new ApolloError("خطا في انشاء الحساب",error)
  }
};
