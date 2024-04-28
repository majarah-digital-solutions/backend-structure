const mongoose = require('mongoose');

const Translation = mongoose.Schema(
  {
    text: {
      title: { type: String, required: true },
    },
    language: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Language",
    },
  },
  { timestamps: true }
);
// translations: [
//   {
//     type: Translation,
//   },
// ],

const BranchSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    icon:{
      type:String,
      default:null
    }
    ,
    description:{
      type:String,
      default:null
    },
    parent:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
    isMain:{
      type:Boolean,
      default:false
    }
},{
  timestamps: true
});


module.exports = BranchSchema