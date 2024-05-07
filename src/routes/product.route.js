const express = require("express");
const route = express.Router();
const { controllers } = require("../controllers/index");

route.post("/products", controllers.productController.create);
route.patch("/products", controllers.productController.update);
route.get(
  "/vendors/:vendorId/products",
  controllers.productController.getAllByVendorId
);
route.get(
  "/vendors/:vendorId/products/:productId",
  controllers.productController.getById
);
route.get("/products", controllers.productController.getAllProduct);
route.delete(
  "/vendors/:vendorId/products/:productId",
  controllers.productController.delete
);

module.exports = { route };
