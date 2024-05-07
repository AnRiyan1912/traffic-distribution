const { updateRequestDto } = require("../dto/dataUpdateProduct.dto");
const { validationOrder } = require("../utils/request.validation");
const { ProductService } = require("./product.service");
const { ReportService } = require("./report.service");

class OrderService {
  #productService;
  #reportService;
  constructor() {
    this.#productService = new ProductService();
    this.#reportService = new ReportService();
  }

  async createOrder(requestData) {
    validationOrder(requestData);
    const findProductByProductId = await this.#productService.getByProductId(
      requestData.productId
    );
    if (!findProductByProductId.is_active) {
      throw new Error("product not found");
    }
    if (findProductByProductId.qty - requestData.qty < 0) {
      throw new Error("product out of stock");
    }
    await this.#productService.updateProduct(
      updateRequestDto(findProductByProductId, requestData.qty)
    );
    const vendorSellingProduct = await this.#productService.getAllProductByName(
      findProductByProductId.nama_product
    );
    let productWithLeastOrders = null;
    let minTransactions = Infinity;
    for (const product of vendorSellingProduct) {
      const transactionsCount = await this.#reportService.countTransactionTotal(
        product.id
      );
      if (transactionsCount < minTransactions) {
        minTransactions = transactionsCount;
        productWithLeastOrders = product;
      }
    }
    const responseCreateReport = await this.#reportService.createReport(
      productWithLeastOrders.id,
      requestData.qty
    );

    return responseCreateReport;
  }
}

module.exports = { OrderService };
