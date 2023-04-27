const jwt = require("jsonwebtoken");
const { Account} = require("../models/model");
const dotenv = require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.verify(token, dotenv.parsed.SECREATKEY);
    var account = await Account.findOne({
      "tokens.token": token,
    }).select("-tokens -profile");

    if (!account) {
      throw new Error("user not found");
    }
    res.user = account;
    res.token = token;
    next();
  } catch (e) {
    console.log(e);
    res.json({ "error": "e" });
  }
};

module.exports = auth;
