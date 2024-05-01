const mongoose = require('mongoose');
const { categoryStatus } = require('../../config/constants');

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default:'icon.png'
  },
  description: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum:Object.values(categoryStatus),
    default: categoryStatus.AVAILABLE
  },
  app:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'App',
    required: true
  }
},{timestamps:true});

module.exports = categorySchema;