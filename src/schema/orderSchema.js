const mongoose = require("mongoose")

var orderSchema = new mongoose.Schema({
     productId:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
     },
     quantity:Number,
     buyTimePrice : Number,
     orderedBy : {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Account",
          required: true
     },
     orderType: {
          type:String,
          enum : ["normal","fast","oneDay"],
          default : "normal"
     },
     orderAddress :{
          name: {type: String,required:true},
          phoneNo : {type: Number,required:true},
          pinCode: {type: Number,required:true},
          locality: {type: String,required:true},
          addressLine : {type: String,required:true}
     },
     orderDate : {type: Date,default:Date.now()},
     estimatedDeliveryDate : Date,
     lastLocation : String,
     Status:String
})

module.exports = orderSchema