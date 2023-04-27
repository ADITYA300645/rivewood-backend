const { default: mongoose } = require("mongoose");

var productSchema = mongoose.Schema({
     name:String,
     price : Number,
     images: [{
          originalname : String,
          mimetype : String,
          size : Number,
          buffer : Buffer 
        }],
     threeDModel:{obj : {
          originalname : String,
          mimetype : String,
          size : Number,
          buffer : Buffer
     },mtl :{
          originalname : String,
          mimetype : String,
          size : Number,
          buffer : Buffer
     }},
     description : {
          type: String,
          default : ""
     },
     categories : {type:[String],default:[]}  ,
     Tags:[String],
     discount : {
          default:0,
          type:Number
     },
})

module.exports = productSchema