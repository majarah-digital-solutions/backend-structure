const lodash = require("lodash");
const appResolvers = require("./app.resolvers/index.js");
const adminResolvers = require("./admin.resolvers/index.js");
const clientResolvers = require("./client.resolvers/index.js");

module.exports = lodash.merge(
    appResolvers,
    adminResolvers,
    clientResolvers
);
