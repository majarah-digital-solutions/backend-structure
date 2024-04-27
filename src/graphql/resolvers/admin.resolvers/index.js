const lodash = require("lodash");
const TranslationsResolvers = require("./translations.resolvers/index.js");
const AuthResolvers = require("./auth.resolvers/index.js");

module.exports = lodash.merge(
  AuthResolvers,
  TranslationsResolvers,
);
