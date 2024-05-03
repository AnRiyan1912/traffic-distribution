const { productController } = require("./product.controller");
const { vendorController } = require("./vendor.controller");

const controllers = {
  vendorController: vendorController,
  productController: productController,
};

module.exports = { controllers };
