const { default: mongoose } = require("mongoose");
const accountSchema = require("../schema/accountSchema");
const orderSchema = require("../schema/orderSchema");
const productSchema =require("../schema/productSchema")
const productCollectionSchema = require("../schema/procuctsCollectionSchema")

const Product = mongoose.model("Product",productSchema);
const Account = mongoose.model("Account",accountSchema);
const Order = mongoose.model("Order",orderSchema);
const ProductCollection = mongoose.model("ProductCollection",productCollectionSchema)
module.exports = {Product,Account,Order,ProductCollection}