const {
  formatters: { Prefixer },
} = require("../../../../utilities/index.js");
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
input updateInput {
  fullname:String,
  phoneNumber:String
}

    type Query {
        ${Prefixer.addPrefix("GetMe")}: User,
    }
    type Mutation {
      ${Prefixer.addPrefix("Register")}(registerData: registerInput): Response,
      ${Prefixer.addPrefix("Login")}(loginData: LoginInput): Response,
      ${Prefixer.addPrefix("Update")}(updateData: updateInput): User,
  }

`;
