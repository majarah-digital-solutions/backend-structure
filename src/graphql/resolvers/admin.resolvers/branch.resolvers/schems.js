const { formatters: { Prefixer }, } = require("../../../../utilities/index.js");
const { prefix } = require("./config.js");
const { gql } = require("apollo-server-express");

Prefixer.setPrefix(prefix);

module.exports = gql`
    input createBranchInput {
      title:String!
      ,parent:String
      ,description:String
      ,icon:String
      ,isMain:Boolean
    }
    input updateBranchInput {
        _id:ID!,
        title:String
        ,description:String
        ,icon:String
      
    }
    type Query {
      ${Prefixer.addPrefix("GetAll")}(pagination:Pagination,title:String): [Branch],
      ${Prefixer.addPrefix("GetOne")}(_id:ID!): Branch,
  }
    type Mutation {
        ${Prefixer.addPrefix("Create")}(createData: createBranchInput): Branch,
        ${Prefixer.addPrefix("Update")}(updateData: updateBranchInput): Branch,
        ${Prefixer.addPrefix("Delete")}(_id:ID!): Boolean,
    }
`;
