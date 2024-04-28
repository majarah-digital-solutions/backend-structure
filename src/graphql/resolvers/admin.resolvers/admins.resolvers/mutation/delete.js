const { ApolloError } = require("apollo-server-express");
const { User } = require("../../../../../models");
const { USERS_ROLES } = require("../../../../../config/constants");

module.exports = async (_, {_id}, {pubsub, user}) => {
    if(!user) return new ApolloError("يجب تسجيل الدخول أولا");
    try {
      if(user.role != USERS_ROLES.ADMIN) return new ApolloError('ليس لديك الصلاحيات')
        const admin = await User.findById(_id)
        if(!admin)  return new ApolloError("الأدمن غير موجود لنقوم بحذفه");
        if(admin.role != USERS_ROLES.ADMIN) return new ApolloError('مستخدم وليس ادمن')
        await User.findByIdAndDelete(_id)
        return true
    }
    catch(err) {
        console.log("🚀 ~ module.exports= ~ err:", err)
        return new ApolloError("خطأ في السيرفر");
    }
};
