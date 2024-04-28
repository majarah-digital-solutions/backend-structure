const mongoose = require('mongoose');

const AppSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    user:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required: true
    },
    branch:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Branch',
       required: true
    },
    logo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null,
        trim: true
    },
    secretKey: {
        type: String,
        // required: true,
    },
    fcmKey: {
        type: String,
        // required: true,
    },    
},{
  timestamps: true
});

module.exports = AppSchema;