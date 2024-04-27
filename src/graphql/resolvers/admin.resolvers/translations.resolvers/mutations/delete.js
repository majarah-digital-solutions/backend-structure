const { ApolloError } = require("apollo-server-express");
const { GearboxModel } = require("../../../../../models");
const models = require("../../../../../models/index");
const Mongoose = require("mongoose");

module.exports = async (
  _,
  { deleteTranslations: { model, _id, language } },
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
    wheelDrive: "WheelDriveModel",
  };

  try {
    const data = await models[mondels[model]].findById(_id);
    const lastTrans = data.translations.filter(
      (item) => item.language.toString() !== language
    );
    console.log("🚀 ~ lastTrans:", data);
    data.translations = lastTrans;
    await data.save();
    return data;
  } catch (error) {
    console.log("🚀 ~ module.exports= ~ error:", error);
    return new ApolloError("Failed to create translate", error);
  }
};
