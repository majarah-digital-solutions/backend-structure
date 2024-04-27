const {
  formatters: { Prefixer },
} = require("../../../../utilities/index.js");
const { prefix } = require("./config.js");
const { gql } = require("apollo-server-express");

Prefixer.setPrefix(prefix);

module.exports = gql`
    input TranslationsInput {
      model: String,
      _id: ID,
      language: ID,
      text: JSON,
    }
    input DeleteTranslationsInput {
      model: String,
      _id: ID,
      language: ID,
    }

    type Mutation {
        ${Prefixer.addPrefix(
          "Create"
        )}(createTranslation: TranslationsInput): JSON,              
        ${Prefixer.addPrefix(
          "Update"
        )}(updateTranslations: TranslationsInput): JSON,              
        ${Prefixer.addPrefix(
          "Delete"
        )}(deleteTranslations: DeleteTranslationsInput): JSON,              
    }
`;
