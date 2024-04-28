const mongoose = require("mongoose");
const TranslationSchema = require("./translation.schema");

const LanguageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    translations: {
      title: TranslationSchema,
    },
    code: { type: String, required: true },
    rtl: { type: Number, required: true },
    status: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = LanguageSchema;
