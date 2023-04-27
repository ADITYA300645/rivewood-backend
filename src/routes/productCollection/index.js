const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const multer = require("multer")
const upload = multer()
const {ProductCollection} = require("../../models/model")

router.get("/",async(req,res)=>{
     var collection = await ProductCollection.find().select("-image");
     res.json({collection})
})

router.post("/",upload.single("image"),async (req,res)=>{
     var items = req.body.productID.map(e=>e)
     var image = req.file
     var discount = req.body.discount
     var productCollection = new ProductCollection({
          items,image,discount
     })
     try{
          var productRef = await productCollection.save()
          res.json({"status":"success"})
     }
     catch(e){
          res.json({"error":e})
     }
})

module.exports =router