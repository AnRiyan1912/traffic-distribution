const express = require("express");
const route = express.Router();
const { controllers } = require("../controllers/index");

route.post("/orders", controllers.orderController.create);

module.exports = { route };
