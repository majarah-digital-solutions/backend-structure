const { ApolloError } = require("apollo-server-express");
const { User } = require("../../../../../models");
const { USERS_ROLES, pagination } = require("../../../../../config/constants");

module.exports = async (_, args, {pubsub, user}) => {
    if(!user) return new ApolloError("يجب تسجيل الدخول أولا");
    try {
      if(user.role != USERS_ROLES.ADMIN) return new ApolloError('ليس لديك الصلاحيات')

        const {page = pagination.page, limit = pagination.limit  } = args;
        console.log('ss',limit)
        let skip = (+page - 1) * +limit;
        const admins = await User.aggregate([
            {$match: {role: USERS_ROLES.ADMIN}},
            {$skip: skip},
            {$limit: +limit},
            {$sort: { createdAt: -1 }},
        ]);
        return admins
    }
    catch (err) {
        console.log("🚀 ~ module.exports= ~ err:", err)
        throw new ApolloError("خطأ في السيرفر");
    }
};
