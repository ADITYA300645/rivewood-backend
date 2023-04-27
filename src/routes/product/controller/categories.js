const express =require("express")
const { Product } = require("../../../models/model")
const router = express.Router()

router.get("/",async(req,res)=>{
     var categories = await (await Product.find().select("categories"))
     var set = new Set()
     categories.forEach(e=>{
          e.categories.forEach(e=>{
               set.add(e)
          })
     })
     set = Array.from(set);
     res.json({"categories":set})
})

router.get("/category",async(req,res)=>{
     var category = req.query.category;
     var products = await Product.find({
          categories : {
               $in:category
          }
     }).select("-images -threeDModel")
     console.log(products);
     res.json({products})
})


module.exports = router