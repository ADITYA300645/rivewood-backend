const express =require("express")
const router = express.Router();
const {Order,Product} = require("../../models/model")
const auth = require("../../middlewares/auth")

router.get("/",auth,(req,res)=>{
     var order = res.user.orders
     res.json({order})
})

router.post("/",auth,async (req,res)=>{
     var productId = req.body.productId;
     var quantity = req.body.quantity;
     var phoneNo = req.body.phoneNo;
     var pinCode = req.body.pinCode;
     var locality = req.body.locality;
     var addressLine = req.body.addressLine;
     var orderAddress = {
       "name": res.user.name,phoneNo,pinCode,locality,addressLine
     };
     var orderType = req.body.orderType;
     var user = res.user;
     try {
       var productPrice  = await Product.findById(productId).select("price discount");
       var buyTimePrice = productPrice.price - (productPrice.price*(productPrice.discount/100))
       var order = new Order({
         orderedBy:user._id,
         productId,
         quantity,
         buyTimePrice,
         orderType,
         orderAddress,
       });
         var orderRef = await order.save();
         user.orders.push(orderRef);
         await user.save();
         res.json({ status: "success" });
       
     } catch (e) {
       console.log(e);
       res.json({ status: "failed" }).status(402);
     }
})

module.exports = router;