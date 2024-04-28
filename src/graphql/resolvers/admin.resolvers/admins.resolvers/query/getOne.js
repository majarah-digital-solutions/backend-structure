const { ApolloError } = require("apollo-server-express");
const { User } = require("../../../../../models");
const { USERS_ROLES } = require("../../../../../config/constants");
module.exports = async (_, {_id}, {pubsub, user}) => {
    if(!user) return new ApolloError("يجب تسجيل الدخول أولا");
    try {
      if(user.role != USERS_ROLES.ADMIN) return new ApolloError('ليس لديك الصلاحيات')

        const admin = await User.findOne({_id,role: USERS_ROLES.ADMIN})
        if(!admin) return new ApolloError('لا يوجد معلومات لهذا المعرف')
        return admin
    }
    catch (err) {
        console.log("🚀 ~ module.exports= ~ err:", err)
        throw new ApolloError("خطأ في السيرفر");
    }
};
