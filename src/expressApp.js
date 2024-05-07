const express = require("express");
const cors = require("cors");
const { routes } = require("./routes");
const expressApp = express();
require("dotenv").config();

expressApp.use(express.json());
expressApp.use(cors());
expressApp.use(routes.vendorRoutes.route);
expressApp.use(routes.productRoutes.route);
expressApp.use(routes.orderRoutes.route);
expressApp.use(routes.reportRoutes.route);

module.exports = expressApp;
