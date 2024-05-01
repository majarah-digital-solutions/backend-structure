const { gql } = require("apollo-server-express");

const TranslationsSchema = require("./translations.resolvers/schema.js");

const adminsSchema = require("./admins.resolvers/schems.js");
const BranchSchema = require("./branch.resolvers/schems.js");
const appsSchema = require("./apps.resolvers/schems.js");
const settingsSchema = require("./settings.resolvers/schems.js");

module.exports = gql`
  ${adminsSchema}
  ${TranslationsSchema}
  ${BranchSchema}
  ${appsSchema}
  ${settingsSchema}
`;
