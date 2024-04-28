const { gql } = require("apollo-server-express");

const userSchema = require("./user.resolvers/schems.js");
const branchSchema = require("./branch.resolvers/schems.js");

module.exports = gql`

${userSchema}
${branchSchema}



`;

