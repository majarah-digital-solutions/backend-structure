const { ApolloError } = require("apollo-server-express");
const { Setting } = require("../../../../../models");
const { USERS_ROLES } = require("../../../../../config/constants");

module.exports = async (_, args, {pubsub, user}) => {
    if(!user) return new ApolloError("يجب تسجيل الدخول أولا");
    try {
      if(user.role != USERS_ROLES.ADMIN) return new ApolloError('ليس لديك الصلاحيات')

        const { key, value, private } = args

        const settingExist = await Setting.findOne({key})

        if(settingExist) return new ApolloError("الإعداد موجود بالفعل");

        const data = {key, value, private}

        const setting = new Setting(data)
        await setting.save()

        return setting
    }
    catch(err) {
        console.log("🚀 ~ module.exports= ~ err:", err)
        return new ApolloError("خطأ في السيرفر");
    }
};
