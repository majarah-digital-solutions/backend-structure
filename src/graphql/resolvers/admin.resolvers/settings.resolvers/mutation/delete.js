const { ApolloError } = require("apollo-server-express");
const { Setting } = require("../../../../../models");
const { USERS_ROLES } = require("../../../../../config/constants");

module.exports = async (_, args, {pubsub, user}) => {
    if(!user) return new ApolloError("يجب تسجيل الدخول أولا");
    try {
      if(user.role != USERS_ROLES.ADMIN) return new ApolloError('ليس لديك الصلاحيات')

        const { id } = args
        const setting = await Setting.findByIdAndDelete(id)
        if(!setting) return new ApolloError("الإعداد غير موجود لنقوم بحذفه");
    
        return true
    }
    catch(err) {
        console.log("🚀 ~ module.exports= ~ err:", err)
        return new ApolloError("خطأ في السيرفر");
    }
};
