const { ApolloError } = require("apollo-server-express");
const { Setting } = require("../../../../../models");
const { USERS_ROLES } = require("../../../../../config/constants");
const { isValidObjectId } = require("mongoose");
module.exports = async (_, {id}, {pubsub, user}) => {
    if(!user) return new ApolloError("يجب تسجيل الدخول أولا");
    try {
      if(user.role != USERS_ROLES.ADMIN) return new ApolloError('ليس لديك الصلاحيات')

        if(!isValidObjectId(id)) return new ApolloError('خطا في صيغة المعرف')
        const setting = await Setting.findById(id)
        if(!setting) return new ApolloError('لا يوجد معلومات لهذا المعرف')
        return setting
    }
    catch (err) {
        console.log("🚀 ~ module.exports= ~ err:", err)
        throw new ApolloError("خطأ في السيرفر");
    }
};
