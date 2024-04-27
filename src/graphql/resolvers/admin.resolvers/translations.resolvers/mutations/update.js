const { ApolloError } = require("apollo-server-express");
const { GearboxModel } = require("../../../../../models");
const models = require("../../../../../models/index");
const Mongoose = require("mongoose");

module.exports = async (
  _,
  { updateTranslations: { model, _id, language, text } },
  ctx
) => {
  const mondels = {
    body: "BodyModel",
    brand: "BrandModel",
    category: "CategoryModel",
    fuel: "FuelModel",
    gearBox: "GearboxModel",
    vehicleTypes: "VehicleTypeModel",
    city: "CityModel",
  };

  try {
    const data = await models[mondels[model]].findById(_id);
    const lastTrans = data.translations.find(
      (item) => item.language.toString() === language
    );
    if (!lastTrans) {
      return new ApolloError("الترجمة لهذه اللغة موجود من فبل");
    }
    lastTrans.text = text;
    await data.save();
    return data;
  } catch (error) {
    console.log("🚀 ~ module.exports= ~ error:", error);
    return new ApolloError("Failed to create translate", error);
  }
};
