const { OrderService } = require("../services/order.service");
const { validationOrder } = require("../utils/request.validation");

const orderService = new OrderService();
const orderController = {
  create: async (req, res) => {
    try {
      const requestData = {
        productId: req.body.product_id,
        qty: req.body.qty,
      };
      validationOrder(requestData);
      const response = await orderService.createOrder(requestData);
      res.status(200).json({ message: "success create order", data: response });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = { orderController };
