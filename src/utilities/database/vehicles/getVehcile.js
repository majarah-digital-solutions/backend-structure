const { screenLimit, cdn } = require("../../../config/constants");
const { VehicleModel, LanguageModel } = require("../../../models");

module.exports = async ({ user, query, limit = screenLimit, page = 1, language }) => {


  if (!language) {
    language = await LanguageModel.findOne({ code: "ar" });
  }
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
        pipeline: [
          {
            $lookup: {
              from: "brands",
              localField: "brand",
              foreignField: "_id",
              as: "brand",
              pipeline: [
                {
                  $addFields: {
                    "logoUrl": {
                      $concat: [cdn, "/192/192/", "$logo"],
                    },
                  },
                },
                {
                  $addFields: {
                    translationsObj: {
                      $filter: {
                        input: "$translations",
                        as: "translation",
                        cond: { $eq: ["$$translation.language", language._id] }
                      }
                    }

                  }
                }, {
                  $unwind: {
                    path: "$translationsObj",
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $project: {
                    title: {
                      $ifNull: ["$translationsObj.text.title", "$title"],
                    },
                    logoUrl: 1,
                    status: 1,
                  }
                }
              ],
            }
          },
          {
            $unwind: {
              path: "$brand",
            }
          },

          {
            $lookup: {
              from: "bodies",
              localField: "body",
              foreignField: "_id",
              as: "body",
              pipeline: [
                {
                  $addFields: {
                    translationsObj: {
                      $filter: {
                        input: "$translations",
                        as: "translation",
                        cond: { $eq: ["$$translation.language", language._id] }
                      }
                    }

                  }
                }, {
                  $unwind: {
                    path: "$translationsObj",
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $project: {
                    title: {
                      $ifNull: ["$translationsObj.text.title", "$title"],
                    },
                    country: 1,
                    status: 1,
                  }
                }
              ]
            },
          },
          {
            $unwind: "$body",
          },

          {
            $lookup: {
              from: "categories",
              localField: "category",
              foreignField: "_id",
              as: "category",
            },
          },
          {
            $unwind: "$category",
          },

          {
            $lookup: {
              from: "wheeldrives",
              localField: "wheelDrive",
              foreignField: "_id",
              as: "wheelDrive",
              pipeline: [
                {
                  $addFields: {
                    translationsObj: {
                      $filter: {
                        input: "$translations",
                        as: "translation",
                        cond: { $eq: ["$$translation.language", language._id] }
                      }
                    }

                  }
                }, {
                  $unwind: {
                    path: "$translationsObj",
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $project: {
                    title: {
                      $ifNull: ["$translationsObj.text.title", "$title"],
                    },
                    country: 1,
                    status: 1,
                  }
                }
              ]
            },
          },
          {
            $unwind: "$wheelDrive",
          },


          {
            $lookup: {
              from: "fuels",
              localField: "fuel",
              foreignField: "_id",
              as: "fuel",
              pipeline: [
                {
                  $addFields: {
                    translationsObj: {
                      $filter: {
                        input: "$translations",
                        as: "translation",
                        cond: { $eq: ["$$translation.language", language._id] }
                      }
                    }

                  }
                }, {
                  $unwind: {
                    path: "$translationsObj",
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $project: {
                    title: {
                      $ifNull: ["$translationsObj.text.title", "$title"],
                    },
                    country: 1,
                    status: 1,
                  }
                }
              ]
            },
          },
          {
            $unwind: "$fuel",
          },

          {
            $lookup: {
              from: "gearboxes",
              localField: "gearBox",
              foreignField: "_id",
              as: "gearBox",
              pipeline: [
                {
                  $addFields: {
                    translationsObj: {
                      $filter: {
                        input: "$translations",
                        as: "translation",
                        cond: { $eq: ["$$translation.language", language._id] }
                      }
                    }

                  }
                }, {
                  $unwind: {
                    path: "$translationsObj",
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $project: {
                    title: {
                      $ifNull: ["$translationsObj.text.title", "$title"],
                    },
                    country: 1,
                    status: 1,
                  }
                }
              ]
            },
          },
          {
            $unwind: "$gearBox",
          },

        ],
      },
    },
    {
      $unwind: "$vehicle",
    },








    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
        pipeline: [
          {
            $addFields: {
              "avatarUrl": {
                $cond: {
                  if: { $eq: ["$avatar", null] },
                  then: "Asd",
                  else: {
                    $concat: [cdn, "/o/100/", "$avatar"],
                  },
                },
              },
            },
          },
        ]
      },
    },
    { $unwind: "$user" },

    {
      $lookup: {
        from: "cities",
        localField: "city",
        foreignField: "_id",
        as: "city",
        pipeline: [
          {
            $addFields: {
              translationsObj: {
                $filter: {
                  input: "$translations",
                  as: "translation",
                  cond: { $eq: ["$$translation.language", language._id] }
                }
              }

            }
          }, {
            $unwind: {
              path: "$translationsObj",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: {
              title: {
                $ifNull: ["$translationsObj.text.title", "$title"],
              },
              country: 1,
              status: 1,
            }
          }
        ]
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
  console.log("🚀 ~ module.exports= ~ vehicles:", vehicles)
  return vehicles;
};
