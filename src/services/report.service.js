const { ReportRepository } = require("../repositories/report.repository");
const { ProductService } = require("./product.service");

class ReportService {
  #reportRepository;
  #productService;
  constructor() {
    this.#reportRepository = new ReportRepository();
    this.#productService = new ProductService();
  }

  async createReport(productId, qty) {
    const findProduct = await this.#productService.getByProductId(productId);
    console.log(findProduct);
  }
}

module.exports = { ReportService };
