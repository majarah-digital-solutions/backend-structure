const { ApolloError } = require("apollo-server-express");
const { otpExpired } = require("../../../../../config/constants");
const { OtpModel } = require("../../../../../models");
const { OTP } = require("../../../../../utilities/helpers");

module.exports = async (_, args) => {
  const { phone } = args;
  const lastOTPCODE = await OtpModel.findOne({ phone: phone });
  if (lastOTPCODE) {
    return await OTP.sendSMS({ phone, code: lastOTPCODE.code })
      .then(() => {
        return {
          _id: lastOTPCODE._id,
          code: lastOTPCODE.code,
          phone,
          expiredAfter: otpExpired,
        };
      })
      .catch((err) => {
        console.log("🚀 ~ file: sendOTP.js:19 ~ awaitOTP.sendSMS ~ err:", err);
        return new ApolloError(
          "حدث خطأ أثناء ارسال رمز المصادقة حاول في وقت لاحق"
        );
      });
  } else {
    const code = OTP.OTPGenerate(4);
    return OTP.sendSMS({ phone, code })
      .then(async (response) => {
        const OtpModelResponse = await OtpModel.create({ phone, code });
        return {
          _id: OtpModelResponse._id,
          code,
          phone,
          expiredAfter: otpExpired,
        };
      })
      .catch((err) => {
        console.log("🚀 ~ file: sendOTP.js:18 ~ OTP.sendSMS ~ err:", err);
        return new ApolloError(
          "حدث خطأ أثناء ارسال رمز المصادقة حاول في وقت لاحق"
        );
      });
  }
};
