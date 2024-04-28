const { formatters: { Prefixer }, } = require("../../../../utilities/index.js");
const { prefix } = require("./config.js");
const { gql } = require("apollo-server-express");

Prefixer.setPrefix(prefix);

module.exports = gql`

  
    type Query {
      ${Prefixer.addPrefix("GetAll")}(pagination:Pagination): [Branch],
      ${Prefixer.addPrefix("GetOne")}(_id:ID!): Branch,
  }
`;
