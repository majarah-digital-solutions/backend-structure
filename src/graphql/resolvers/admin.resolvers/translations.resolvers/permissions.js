const { allow } = require("graphql-shield");
const { prefix } = require("./config.js");
const { settings : { isExistApp }, users } = require("../../../permissions/index.js");
const { formatters : { Prefixer } } = require("../../../../utilities/index.js");

Prefixer.setPrefix(prefix);

module.exports = {
    Query: {
        [Prefixer.addPrefix('GetAll')]: allow,
    }
};
