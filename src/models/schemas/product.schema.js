const mongoose = require('mongoose');
const { productStatus, cdn, CRUDStatus, PRODUCTStatus } = require('../../config/constants');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
    },
    color: {
        type: String,
        required: false,
        default: "#ddd"
    },
    status: {
        type: String,
        required: true,
        default: PRODUCTStatus.AVAILABLE
    },
    images: 
     [
        {
          type:String, 
          required: true
        }
    ],

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    app: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "App",
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min:0,
        default:0
    },

},{timestamps:true});


  
module.exports = ProductSchema