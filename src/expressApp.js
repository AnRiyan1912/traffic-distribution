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
  controllers.productController.getAllByVendorId
);
expressApp.get(
  "/vendors/:vendorId/products/:productId",
  controllers.productController.getById
);
expressApp.get("/products", controllers.productController.getAllProduct);
expressApp.delete(
  "/vendors/:vendorId/products/:productId",
  controllers.productController.delete
);

expressApp.get("/reports", controllers.reportController.getReportByDate);

expressApp.post("/orders", controllers.orderController.create);

module.exports = expressApp;
