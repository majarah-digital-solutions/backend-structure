const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const translationSchema = mongoose.Schema(
    {
        translation: {
            
        },
        language: { 
            type: ObjectId, 
            ref: "Language", 
        },
    },
    {timestamps: true}
)

module.exports = translationSchema