const { ApolloError } = require("apollo-server-express");
const { UsersModel } = require("../../../../../models");
const {phone} = require('phone');

module.exports = async (_, {phoneNumber}, context) => {
    phoneObj = phone(phoneNumber,{country: "IL"});
    if(phoneObj.isValid){
        const user = await UsersModel.findOne({phone: phoneObj.phoneNumber})
        if(user){
            return new ApolloError("رقم الهاتف مستخدم من قبل");
        }else {
            return true;
        }
    }else{
        return new ApolloError("رقم الهاتف غير صالح");
    }
}