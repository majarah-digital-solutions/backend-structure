const { gql } = require("apollo-server-express");

const TranslationsSchema = require("./translations.resolvers/schema.js");

const AuthSchema = require("./auth.resolvers/schems.js");

module.exports = gql`
  ${AuthSchema}
  ${TranslationsSchema}
`;
