const { gql } = require("apollo-server-express");

const authSchema = require("./auth.resolvers/schems.js");
const userSchema = require("./user.resolvers/schems.js");

module.exports = gql`

  ${authSchema}
  ${userSchema}



`;

