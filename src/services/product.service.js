const { ProductRepository } = require("../repositories/product.repository");
const {
  validationProduct,
  validationProductGetById,
} = require("../utils/request.validation");

class ProductService {
  #productRepository;
  constructor() {
    this.#productRepository = new ProductRepository();
  }

  async createProduct(data) {
    validationProduct(data);
    const { vendorId, productName, modal, qty, sellingPrice } = data;
    return await this.#productRepository.create(
      vendorId,
      productName,
      modal,
      qty,
      sellingPrice
    );
  }

  async getByIdProduct(data) {
    validationProductGetById(data);
    const { productId, vendorId } = data;
    return await this.#productRepository.findById(productId, vendorId);
  }

  async getAllProduct(vendorId) {
    return await this.#productRepository.getAll(vendorId);
  }
}

module.exports = { ProductService };
