const { ApolloError } = require("apollo-server-express");
const { Setting } = require("../../../../../models");
const { isValidObjectId } = require("mongoose");
const { USERS_ROLES } = require("../../../../../config/constants");

module.exports = async (_, args, {pubsub, user}) => {
    if(!user) return new ApolloError("يجب تسجيل الدخول أولا");
    try {

      if(user.role != USERS_ROLES.ADMIN) return new ApolloError('ليس لديك الصلاحيات')

        const { id, key, value, private, active } = args
        if(!isValidObjectId(id)) return new ApolloError('خطا في صيغة المعرف')

        let data = {}

        if(key) data.key = key
        if(value) data.value = value
        if(private && typeof private === "boolean") data.private = private
        if(active && typeof active === "boolean") data.active = active

        const setting = await Setting.findByIdAndUpdate(id, data, {new: true})

        if(!setting) return new ApolloError("الإعداد غير موجود");

        return setting
    }
    catch(err) {
        console.log("🚀 ~ module.exports= ~ err:", err)
        return new ApolloError("خطأ في السيرفر");
    }
};
