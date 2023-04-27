const express = require("express")
const router = express.Router()
const multer = require("multer")
const {Duplex} = require("stream")
const { Product } = require("../../models/model")
const upload = multer()
const categoriesController = require("./controller/categories")

router.use("/categories",categoriesController)

router.get("/",async(req,res)=>{
     var products = await (await Product.find().select("_id")).reverse()
     res.json({products})
})

router.get("/product/:id",async(req,res)=>{

     //todo redo : images Length

     var product = await Product.findById(req.params.id).select(["-images", "-threeDModel"]).lean().exec()
     var imagesCount = await Product.findById(req.params.id).select("images.length")
     product.imagesCount = imagesCount.images.length
     res.json({product})
})

router.get("/productImages/:id/:n",async(req,res)=>{
     var product = await Product.findById(req.params.id).select("images");
     var duplex = new Duplex();
     duplex.push(product.images[req.params.n].buffer);
     duplex.push(null);
     duplex.pipe(res)
})

router.get("/productModel/obj/:id",async(req,res)=>{
     var product = await Product.findById(req.params.id).select("threeDModel");
     var duplex = new Duplex();
     duplex.push(product.threeDModel.obj.buffer);
     duplex.push(null);
     duplex.pipe(res)
})
router.get("/productModel/mlt/:id",async(req,res)=>{
     var product = await Product.findById(req.params.id).select("threeDModel");
     var duplex = new Duplex();
     duplex.push(product.threeDModel.mtl.buffer);
     duplex.push(null);
     duplex.pipe(res)
})


router.post(
     "/product",
     upload.fields([{
          name : "image",
          maxCount:8
     },{
          name : "obj",
          maxCount:1
     },
     {
          name:"mtl",
          maxCount:1
     }
]),
     async(req,res)=>{
     var name = req.body.name;
     var price = req.body.price;
     var description = req.body.description;
     var categories = req.body.categories.map(e=>e);
     var tags = req.body.tags;
     var images = req.files.image.map(e => ({
          originalname : e.originalname,
          mimetype : e.mimetype,
          size : e.size,
          buffer : e.buffer
       }));
     var threeDModel = {
          obj:req.files.obj[0],
          mtl:req.files.mtl[0]
     }
       var productRef = new Product({
          name,price,images,threeDModel,description,categories,tags
       })
       try{
          await productRef.save()
          res.json({"status":"uploaded"})
       }catch(e){
          console.log(e);
          res.json({"error":e});
       }

})

module.exports = router