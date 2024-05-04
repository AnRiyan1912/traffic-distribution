const { ProductService } = require("./product.service");

class OrderService {
  #productService;
  #reportService;
  constructor() {
    this.#productService = new ProductService();
    this.#reportService = new this.#reportService();
  }

  async createOrder() {}
}

module.exports = { OrderService };
