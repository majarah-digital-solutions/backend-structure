const { formatters: { Prefixer }, } = require("../../../../utilities/index.js");
const { prefix } = require("./config.js");
const { gql } = require("apollo-server-express");

Prefixer.setPrefix(prefix);

module.exports = gql`
    type Query {
        ${Prefixer.addPrefix("GetAll")}(page: Int, limit: Int,key:String): [Setting],
        ${Prefixer.addPrefix("GetOne")}(id:ID!): Setting,
    }

    type Mutation {
        ${Prefixer.addPrefix("Create")}(key: String, value: SettingValueInput, private: Boolean): Setting,
        ${Prefixer.addPrefix("Update")}(id: ID!, key: String, value: SettingValueInput, private: Boolean, active: Boolean): Setting,
        ${Prefixer.addPrefix("Delete")}(id: ID!): Boolean,
    }
`;