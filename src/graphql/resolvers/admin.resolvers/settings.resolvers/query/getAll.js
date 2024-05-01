const { ApolloError } = require("apollo-server-express");
const { Setting } = require("../../../../../models");
const { USERS_ROLES } = require("../../../../../config/constants");

module.exports = async (_, args, {pubsub, user}) => {   
    if(!user) return new ApolloError("يجب تسجيل الدخول أولا");
    try {
      if(user.role != USERS_ROLES.ADMIN) return new ApolloError('ليس لديك الصلاحيات')

        const { page = 1, limit = 10 ,key } = args;
        let skip = (+page - 1) * +limit;
        let query = {}
        if(key) query.key = { $regex: key, $options: 'i' }
    
        const settings = (
            await Setting
                .find(query)
                .skip(skip)
                .limit(+limit)
                .sort({ createdAt: -1 })
        );

        return settings
    }
    catch (err) {
        console.log("🚀 ~ module.exports= ~ err:", err)
        throw new ApolloError("خطأ في السيرفر");
    }
};
