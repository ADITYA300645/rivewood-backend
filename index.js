const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const { Product } = require("./src/models/model");
const userController = require("./src/routes/user/index");
const productController = require("./src/routes/product/index");
const orderController = require("./src/routes/Order/index");
const productCollectionController = require("./src/routes/productCollection/index");
const app = express();

app.use(bodyParser.json());
app.use("/user", userController);
app.use("/products", productController);
app.use("/order", orderController);
app.use("/collection", productCollectionController);

mongoose
  .connect("mongodb://localhost:27017/rivewood")
  .catch((e) => console.log(e));

app.listen(3000, () => {
  console.log("http://192.168.56.1:3000/");
  console.log("http://localhost:3000/");
});
