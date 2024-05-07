const express = require("express");
const route = express.Router();
const { controllers } = require("../controllers/index");

route.post("/vendors", controllers.vendorController.create);

module.exports = { route };
