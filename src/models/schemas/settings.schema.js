const mongoose = require("mongoose");

const SettingSchema = mongoose.Schema({
    key: { type: String, required: true, unique: true },
    value: { type: Map, required: true },
    private: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
},{timestamps: true});

module.exports = SettingSchema;
