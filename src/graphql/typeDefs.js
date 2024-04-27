const { gql } = require("apollo-server-express");
const adminSchemas = require("./resolvers/admin.resolvers/admin.schemas.js");
const appSchemas = require("./resolvers/app.resolvers/app.schemas.js");
const clientSchemas = require("./resolvers/client.resolvers/client.schemas.js");

module.exports = gql`
  scalar JSON
  scalar DateTime

  type Translations {
    text: JSON
    language: Language
  }


  type Language {
    _id: ID
    title: String
    code: String
    rtl: Int
    status: String
  }

  type User {
    _id: ID
    fullname: String
    phone: String
    avatar: String
    status: String
    blocked: Boolean
    verfied: Boolean
    activated: Boolean
    deleted: Boolean
    scm_token: String
  }

  type UserInfo {
    _id: ID
    fullname: String
    phone: String
    avatarUrl: String
  }







  type Response {
    success: Boolean
    message: String
    data: JSON
    token: String
  }

  ${adminSchemas}
  ${appSchemas}
  ${clientSchemas}
`;