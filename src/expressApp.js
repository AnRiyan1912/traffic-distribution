const express = require("express");
const cors = require("cors");
const { controllers } = require("./controllers");
const expressApp = express();
require("dotenv").config();

expressApp.use(express.json());
expressApp.use(cors());

expressApp.post("/vendors", controllers.vendorController.create);
expressApp.post("/products", controllers.productController.create);
expressApp.get(
  "/vendors/:vendorId/products",
  controllers.productController.getAll
);
expressApp.get(
  "/vendors/:vendorId/products/:productId",
  controllers.productController.getById
);

module.exports = expressApp;
