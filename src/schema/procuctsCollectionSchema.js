const { default: mongoose } = require("mongoose");

var productCollectionSchema = mongoose.Schema({
     items:[{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Product",
     }],
     image: {
          originalname : String,
          mimetype : String,
          size : Number,
          buffer : Buffer 
        },
     discount : {
          default:0,
          type:Number
     },
     price : Number,
})

module.exports = productCollectionSchema