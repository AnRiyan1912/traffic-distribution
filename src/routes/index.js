const productRoutes = require("./product.route");
const vendorRoutes = require("./vendor.route");
const reportRoutes = require("./report.route");
const orderRoutes = require("./order.route");

const routes = {
  productRoutes,
  vendorRoutes,
  reportRoutes,
  orderRoutes,
};

module.exports = { routes };
