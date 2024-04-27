const { formatters: { Prefixer }, } = require("../../../../utilities/index.js");
const { prefix } = require("./config.js");
const { gql } = require("apollo-server-express");

Prefixer.setPrefix(prefix);

module.exports = gql`
    input registerInput {
        fullname:String!,
        password:String!,
        phoneNumber:String!
    }
    input LoginInput {
        phoneNumber: String,         
        password: String
    }
    type userData  {
        _id:ID
        phoneNumber: String!
        avatarUrl: String
        token:String
        fullname:String
    }
    type checkOTP {
        isValid: Boolean!,
    }
    type Mutation {
        ${Prefixer.addPrefix("Register")}(registerData: registerInput): userData,
        ${Prefixer.addPrefix("Login")}(loginData: LoginInput): userData,
        ${Prefixer.addPrefix("SendOTP")}(phone: String): JSON
        ${Prefixer.addPrefix("CheckOTP")}(_id: String, code: String): checkOTP
        ${Prefixer.addPrefix("ExistPhoneNumber")}(phoneNumber: String): Boolean
    }
`;
