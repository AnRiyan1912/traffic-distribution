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
    if (!findProductByProductId.qty === 0) {
      throw new Error("product out of stock");
    }
    const dataUpdateProduct = {
      id: findProductByProductId.id,
      productId: findProductByProductId.id,
      vendorId: findProductByProductId.vendor_id,
      productName: findProductByProductId.nama_product,
      dateOfEntry: findProductByProductId.tanggal_masuk,
      modal: findProductByProductId.modal,
      qty: findProductByProductId.qty - requestData.qty,
      sellingPrice: findProductByProductId.harga_jual,
      isActive: findProductByProductId.is_active,
      createdAt: findProductByProductId.created_at,
      updatedAt: findProductByProductId.updated_at,
    };
    console.log(dataUpdateProduct);
    await this.#productService.updateProduct(dataUpdateProduct);
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
