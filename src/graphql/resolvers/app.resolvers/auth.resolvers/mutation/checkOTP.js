const { result } = require("lodash");
const { ApolloError } = require("apollo-server-express");
const { OtpModel } = require("../../../../../models");

module.exports = async (_, {_id,code}, context) => {
    return await OtpModel.findOne({_id,code}).then( async (result) => {
        if(result){
            await result.deleteOne();
            return {isValid : true};
        }else{
            return new ApolloError("رمز غير صالح")
        }
        
    }).catch((err) => {
        console.error(err, "err");
        return new ApolloError("رمز غير صالح")
    })

}