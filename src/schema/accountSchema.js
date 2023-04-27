const { default: mongoose } = require("mongoose");
const productSchema = require("./productSchema")
const orderSchema = require("./orderSchema")

var accountSchema = new mongoose.Schema({
     name:{type:String,required: true},
     addresses : [{
          name: {type: String,required:true},
          phoneNo : {type: Number,required:true},
          pinCode: {type: Number,required:true},
          locality: {type: String,required:true},
          AddressLine : {type: String,required:true}
     }],
     email:{type:String,required: true},
     phoneNo: {
          type:Number
     },
     password:{type:String,required: true},
     profile : Buffer,
     SavedItems : [productSchema],
     orders:[orderSchema],
     AccountType:{
          type:String,
          enum : ["customer","seller","admin"],
          default : "customer"
     },
     tokens:[{
          token:{
               type:String,
               required: true
          }
     }],
})

module.exports = accountSchema