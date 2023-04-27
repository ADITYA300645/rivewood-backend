const express = require('express');
const { Account } = require('../../../models/model');
const router = express.Router();
const multer = require("multer")
const dotenv = require("dotenv").config().parsed
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const upload = multer()

router.post("/",upload.single("profile"),async (req,res)=>{
     var name = req.body.name;
     var email = req.body.email;
     var password = await bcrypt.hash(req.body.password,8);
     var profile = req.file.buffer;

     var token = jwt.sign({name,email},dotenv.SECREATKEY,{expiresIn:"7days"})
     var user = new Account({
          name,email,password,profile,tokens:[{token}]
     })

     try{
          await user.save();
          res.json({token})
     }catch(e){
          console.log(e);
          res.json({"error":e});
     }
})

module.exports = router