const { orderController } = require("./order.controller");
const { productController } = require("./product.controller");
const { reportController } = require("./report.controller");
const { vendorController } = require("./vendor.controller");

const controllers = {
  vendorController: vendorController,
  productController: productController,
  orderController: orderController,
  reportController: reportController,
};

module.exports = { controllers };
