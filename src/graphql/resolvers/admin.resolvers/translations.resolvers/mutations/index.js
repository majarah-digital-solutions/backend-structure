const { prefix } = require("../config.js");
const create = require("./create.js");
const update = require("./update.js");
const transDelete = require("./delete.js");
const {
  formatters: { Prefixer },
} = require("../../../../../utilities/index.js");

Prefixer.setPrefix(prefix);

module.exports = {
  [Prefixer.addPrefix("Create")]: create,
  [Prefixer.addPrefix("Update")]: update,
  [Prefixer.addPrefix("Delete")]: transDelete,
};
