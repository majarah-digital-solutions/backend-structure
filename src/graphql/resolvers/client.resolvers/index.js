const lodash = require("lodash");

const userResolvers = require("./user.resolvers/index.js");

module.exports = lodash.merge(
  userResolvers,

);
