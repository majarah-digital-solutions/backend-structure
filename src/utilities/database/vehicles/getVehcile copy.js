const { screenLimit, cdn } = require("../../../config/constants");
const { VehicleModel } = require("../../../models");

module.exports = async ({ user, query, limit = screenLimit, page = 1 }) => {
  const skip = (page - 1) * limit;
  const vehicles = await VehicleModel.aggregate([
    // البحث عن المركبات وتطبيق أي شروط البحث
    { $match: query },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
    {
      $addFields: {
        images: {
          $map: {
            input: "$images",
            as: "img",
            in: {
              image: "$$img.image",
              imageUrl: {
                $concat: [cdn, "/192/192/", "$$img.image"], // قم بتغيير "cdnUrl/" إلى عنوان URL الخاص بك
              },
            },
          },
        },
      },
    },
    {
      $addFields: {
        priceFormated: {
          $concat: [
            "₪",
            {
              $toString: {
                $divide: ["$price", 1], // تحويل السعر إلى نص
              },
            },
          ],
        },
      },
    },
    // الانضمام للبيانات المرتبطة
    {
      $lookup: {
        from: "vehicleinformations",
        localField: "vehicle",
        foreignField: "_id",
        as: "vehicle",
        pipeline: [{
          $lookup: {
            from: "brands",
            localField: "vehicle.brand",
            foreignField: "_id",
            as: "vehicle.brand",
          },
          $unwind: "$vehicle.brand",
        }]
      },
    },
    {
      $unwind: "$vehicle",
    },
    {
      $lookup: {
        from: "brands",
        localField: "vehicle.brand",
        foreignField: "_id",
        as: "vehicle.brand",
      },
    },
    {
      $unwind: "$vehicle.brand",
    },
    {
      $addFields: {
        "vehicle.brand.logoUrl": {
          $concat: [cdn, "/192/192/", "$vehicle.brand.logo"],
        },
      },
    },
    {
      $lookup: {
        from: "bodies",
        localField: "vehicle.body",
        foreignField: "_id",
        as: "vehicle.body",
      },
    },
    {
      $unwind: "$vehicle.body",
    },
    {
      $lookup: {
        from: "categories",
        localField: "vehicle.category",
        foreignField: "_id",
        as: "vehicle.category",
      },
    },
    {
      $unwind: "$vehicle.category",
    },
    {
      $lookup: {
        from: "wheeldrives",
        localField: "vehicle.wheelDrive",
        foreignField: "_id",
        as: "vehicle.wheelDrive",
      },
    },
    {
      $unwind: "$vehicle.wheelDrive",
    },
    {
      $lookup: {
        from: "fuels",
        localField: "vehicle.fuel",
        foreignField: "_id",
        as: "vehicle.fuel",
      },
    },
    {
      $unwind: "$vehicle.fuel",
    },
    {
      $lookup: {
        from: "gearboxes",
        localField: "vehicle.gearBox",
        foreignField: "_id",
        as: "vehicle.gearBox",
      },
    },
    {
      $unwind: "$vehicle.gearBox",
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $addFields: {
        "user.avatarUrl": {
          $cond: {
            if: { $eq: ["$user.avatar", null] },
            then: "Asd",
            else: {
              $concat: [cdn, "/o/100/", "$user.avatar"],
            },
          },
        },
      },
    },
    {
      $lookup: {
        from: "cities",
        localField: "city",
        foreignField: "_id",
        as: "city",
      },
    },
    { $unwind: "$city" },
    {
      $lookup: {
        from: "colors",
        localField: "color",
        foreignField: "_id",
        as: "color",
      },
    },
    { $unwind: "$color" },
    {
      $lookup: {
        from: "vehicleoptions",
        localField: "options",
        foreignField: "_id",
        as: "options",
      },
    },

    {
      $lookup: {
        from: "favourates",
        let: { vehicleId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$vehicle", "$$vehicleId"] },
                  { $eq: ["$user", user?._id] },
                ],
              },
            },
          },
          { $limit: 1 },
        ],
        as: "favourite",
      },
    },
    // { $unwind: "$favourite" },
    {
      $addFields: {
        optionsFormated: {
          $cond: [
            { $eq: [{ $type: "$options" }, "array"] },
            {
              $reduce: {
                input: { $slice: ["$options.title", 0, 5] },
                initialValue: "",
                in: {
                  $concat: [
                    "$$value",
                    {
                      $cond: [{ $gt: [{ $strLenCP: "$$value" }, 0] }, ", ", ""],
                    },
                    "$$this",
                  ],
                },
              },
            },
            "لا ميزات إضافية",
          ],
        },
      },
    },
    {
      $project: {
        city: 1,
        options: 1,
        user: 1,
        images: 1,
        color: 1,
        vehicle: 1,
        isNew: 1,
        license: 1,
        negotiable: 1,
        odometer: 1,
        optionsFormated: 1,
        previousOwners: 1,
        price: 1,
        priceFormated: 1,
        priceVisibility: 1,
        status: 1,
        isFavourite: {
          $cond: { if: { $size: "$favourite" }, then: true, else: false },
        },
      },
    },
  ]);
  return vehicles;
};
console.log("🚀 ~ module.exports= ~ screenLimit:", screenLimit);
