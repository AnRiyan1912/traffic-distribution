const express = require("express");
const route = express.Router();
const { controllers } = require("../controllers/index");

route.get("/reports", controllers.reportController.getReportByDate);

module.exports = { route };
