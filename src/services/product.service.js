const { ProductRepository } = require("../repositories/product.repository");
const { getDateFormatDb } = require("../utils/getDate");

const {
  validationProduct,
  validationProductGetById,
  validationUpdateProduct,
} = require("../utils/request.validation");
const { VendorService } = require("./vendor.service");

class ProductService {
  #productRepository;
  #vendorService;
  constructor() {
    this.#productRepository = new ProductRepository();
    this.#vendorService = new VendorService();
  }

  async createProduct(data) {
    validationProduct(data);
    let { vendorId, productName, modal, qty, sellingPrice } = data;
    productName = String(productName).toLowerCase();
    const checkExistingVendor = await this.#vendorService.getVendorById(
      data.vendorId
    );
    if (!checkExistingVendor) {
      throw new Error("vendor not already exist");
    }
    const getExistingProduct = await this.#productRepository.getAllByVendorId(
      vendorId
    );
    const findProductExisting = getExistingProduct.find(
      (item) => item.nama_product === productName
    );
    if (findProductExisting) {
      throw new Error("product is already exist");
    }
    const hppPerUnit = modal / qty;
    return await this.#productRepository.create(
      vendorId,
      productName,
      modal,
      qty,
      sellingPrice,
      hppPerUnit
    );
  }

  async getByProductId(productId) {
    const response = await this.#productRepository.getByIdProduct(productId);
    if (!response) {
      throw new Error("product not found");
    }
    return response;
  }

  async getByVendorIdAndProductId(productId, vendorId) {
    validationProductGetById(productId, vendorId);
    const response = await this.#productRepository.findByIdAndVendorId(
      productId,
      vendorId
    );
    if (!response[0]) {
      throw new Error("product not found");
    }
    return response;
  }

  async getAllProductByVendorId(vendorId) {
    return await this.#productRepository.getAllByVendorId(vendorId);
  }

  async updateProduct(data) {
    validationUpdateProduct(data);
    const checkUpdateSellingPrice = await this.getByVendorIdAndProductId(
      data.id,
      data.vendorId
    );
    if (
      parseInt(data.sellingPrice) ===
      parseInt(checkUpdateSellingPrice[0].harga_jual)
    ) {
      data["updatedAt"] = await getDateFormatDb();
      return this.#productRepository.update(data);
    } else {
      data.isActive = false;
      this.#productRepository.update(data);
      const { vendorId, productName, modal, dateOfEntry, qty, sellingPrice } =
        data;
      return await this.#productRepository.createProductAfterUpdateSellingPrice(
        vendorId,
        productName,
        modal,
        dateOfEntry,
        qty,
        sellingPrice
      );
    }
  }

  async deleteProduct(productId, vendorId) {
    const dataRequest = { productId, vendorId };
    const findProduct = await this.getByVendorIdAndProductId(dataRequest);
    findProduct[0]["isActive"] = false;
    return await this.#productRepository.update(findProduct[0]);
  }

  async getAllProductByName(productName) {
    productName = String(productName).toLowerCase();
    return await this.#productRepository.findAllProductByName(productName);
  }

  async getAllProduct() {
    return await this.#productRepository.findAllProduct();
  }
}

module.exports = { ProductService };
