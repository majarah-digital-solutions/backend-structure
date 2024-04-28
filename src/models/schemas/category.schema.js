const mongoose = require('mongoose');
const { categoryStatus } = require('../../config/constants');

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    // required: true
  },
  description: {
    type: String,
    default: null
  },
  status: {
    type: String,
    default: categoryStatus.AVAILABLE
  }, 
},{timestamps:true});

module.exports = categorySchema;