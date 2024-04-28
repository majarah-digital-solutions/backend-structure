const {formatters: { Prefixer },} = require("../../../../utilities/index.js");
const { prefix } = require("./config.js");
const { gql } = require("apollo-server-express");

Prefixer.setPrefix(prefix);

module.exports = gql`
input registerInput {
  fullname:String!,
  phoneNumber:String!
  password:String!,
}
input LoginInput {
  phoneNumber:String!
  password:String!,
}
    type Query {
        ${Prefixer.addPrefix("GetAll")}(page: Int, limit: Int): [User],
        ${Prefixer.addPrefix("GetOne")}(_id :ID!): User,
    }

    type Mutation {
        ${Prefixer.addPrefix("Create")}(registerData:registerInput): Response,
        ${Prefixer.addPrefix("Login")}(loginData: LoginInput): Response,
        ${Prefixer.addPrefix("Delete")}(_id:ID!): Boolean,

    }
`;