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
  input Pagination {
    limit:Int
    page: Int
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
    role:String
    avatar: String
    status: String
    blocked: Boolean
    verfied: Boolean
    activated: Boolean
    deleted: Boolean
  }



  type Response {
    success: Boolean
    message: String
    data: JSON
    token: String
  }


  type App {
    _id: ID
    name: String
    description: String
    logo: String
    user: User
    branch:Branch
  }
  type Branch {
    _id: ID
    title: String
    description: String
    icon: String
    parent:Branch
    isMain:Boolean
  }

  ${adminSchemas}
  ${appSchemas}
  ${clientSchemas}
`;
