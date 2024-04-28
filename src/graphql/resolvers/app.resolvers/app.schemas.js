const { gql } = require("apollo-server-express");

const appsSchema = require("./apps.resolvers/schems.js");
const userSchema = require("./user.resolvers/schems.js");

module.exports = gql`

  ${appsSchema}
  ${userSchema}



`;

