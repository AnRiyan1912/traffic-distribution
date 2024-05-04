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
    const { vendorId, productName, modal, qty, sellingPrice } = data;
    const checkExistingVendor = await this.#vendorService.getVendorById(
      data.vendorId
    );
    if (!checkExistingVendor) {
      throw new Error("vendor not already exist");
    }
    const getExistingProduct = await this.#productRepository.getAll(vendorId);
    const findProductExisting = getExistingProduct.find(
      (item) => item.nama_product === productName
    );
    if (findProductExisting) {
      throw new Error("product is already exist");
    }

    return await this.#productRepository.create(
      vendorId,
      productName,
      modal,
      qty,
      sellingPrice
    );
  }

  async getByProductId(productId) {
    const response = await this.#productRepository.getByIdProduct(productId);
    if (!response) {
      throw new Error("product not found");
    }
    return response;
  }

  async getByVendorIdAndProductId(data) {
    validationProductGetById(data);
    const { productId, vendorId } = data;
    const response = await this.#productRepository.findByIdAndVendorId(
      productId,
      vendorId
    );
    if (!response[0]) {
      throw new Error("product not found");
    }
    return response;
  }

  async getAllProduct(vendorId) {
    return await this.#productRepository.getAll(vendorId);
  }

  async updateProduct(data) {
    validationUpdateProduct(data);
    const checkUpdateSellingPrice = await this.getByVendorIdAndProductId(
      data.id,
      data.vendorId
    );
    if (data.sellingPrice == checkUpdateSellingPrice[0].harga_jual) {
      data["updatedAt"] = getDateFormatDb();
      return this.#productRepository.update(data);
    } else {
      data.isActive = false;
      this.#productRepository.update(data);
      const { vendorId, productName, modal, dateOfEntry, qty, sellingPrice } =
        data;
      return this.#productRepository.createProductAfterUpdateSellingPrice(
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
    return this.#productRepository.update(findProduct[0]);
  }
}

module.exports = { ProductService };
