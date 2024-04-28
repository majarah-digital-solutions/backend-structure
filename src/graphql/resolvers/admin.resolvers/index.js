const lodash = require("lodash");
const TranslationsResolvers = require("./translations.resolvers/index.js");
const AdminsResolvers = require("./admins.resolvers/index.js");
const BranchResolvers = require("./branch.resolvers/index.js");
const AppsResolvers = require("./apps.resolvers/index.js");

module.exports = lodash.merge(
  AdminsResolvers,
  TranslationsResolvers,
  BranchResolvers,
  AppsResolvers
);
