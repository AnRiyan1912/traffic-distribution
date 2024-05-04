const express = require("express");
const cors = require("cors");
const { controllers } = require("./controllers");
const expressApp = express();
require("dotenv").config();

expressApp.use(express.json());
expressApp.use(cors());

expressApp.post("/vendors", controllers.vendorController.create);
expressApp.post("/products", controllers.productController.create);
expressApp.patch("/products", controllers.productController.update);
expressApp.get(
  "/vendors/:vendorId/products",
  controllers.productController.getAll
);
expressApp.get(
  "/vendors/:vendorId/products/:productId",
  controllers.productController.getById
);
expressApp.delete(
  "/vendors/:vendorId/products/:productId",
  controllers.productController.delete
);

expressApp.post("/order");

module.exports = expressApp;
