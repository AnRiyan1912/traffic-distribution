const db = require("../db/prisma.config");

class ProductRepository {
  #db;
  constructor() {
    this.#db = db.client;
  }

  async create(vendorId, productName, modal, qty, sellingPrice) {
    const response = await this.#db.$transaction([
      this.#db.m_product.create({
        data: {
          vendor_id: vendorId,
          nama_product: productName,
          modal: modal,
          qty: qty,
          harga_jual: sellingPrice,
        },
      }),
    ]);
    return response;
  }

  async createProductAfterUpdateSellingPrice(
    vendorId,
    productName,
    modal,
    dateOfEntry,
    qty,
    sellingPrice
  ) {
    const response = await this.#db.$transaction([
      this.#db.m_product.create({
        data: {
          vendor_id: vendorId,
          nama_product: productName,
          modal: modal,
          tanggal_masuk: dateOfEntry,
          qty: qty,
          harga_jual: sellingPrice,
        },
      }),
    ]);
    return response;
  }

  async findByIdAndVendorId(productId, vendorId) {
    const response = await this.#db
      .$queryRaw`SELECT * FROM m_product WHERE id = ${productId} AND vendor_id=${vendorId} AND is_active = true`;
    return response;
  }

  async getAllByVendorId(vendorId) {
    const response = await this.#db
      .$queryRaw`SELECT * FROM m_product WHERE vendor_id = ${vendorId} AND is_active = true `;
    return response;
  }

  async update(data) {
    const response = await this.#db.m_product.update({
      where: { id: data.id, vendor_id: data.vendorId },
      data: {
        nama_product: data.productName,
        tanggal_masuk: data.dateOfEntry,
        modal: data.modal,
        qty: data.qty,
        vendor_id: data.vendorId,
        harga_jual: data.sellingPrice,
        is_active: data.isActive,
        created_at: data.createdAt,
        updated_at: data.updatedAt,
      },
    });
    return response;
  }

  async getByIdProduct(productId) {
    const response = this.#db.m_product.findUnique({
      where: { id: productId },
    });
    return response;
  }

  async findAllProductByName(productName) {
    const response = await this.#db.m_product.findMany({
      where: { nama_product: productName },
    });
    return response;
  }

  async findAllProduct() {
    const response = await this.#db.m_product.findMany({
      where: { is_active: true },
    });
    return response;
  }
}

module.exports = { ProductRepository };
