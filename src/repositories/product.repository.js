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
          sellingPrice: sellingPrice,
        },
      }),
    ]);
    return response;
  }

  async findById(productId, vendorId) {
    const response = await this.#db
      .$queryRaw`SELECT * FROM m_product WHERE id = ${productId} AND vendor_id=${vendorId}`;
    return response;
  }

  async getAll(vendorId) {
    const response = await this.#db
      .$queryRaw`SELECT mp.id, mp.nama_product, mp.tanggal_masuk, mp.modal, mp.qty, mph.harga_jual, mp.created_at, mp.updated_at FROM m_product
       mp INNER JOIN m_product_harga mph ON mph.product_id = mp.id WHERE mp.vendor_id = ${vendorId} AND mp.is_active = true `;
    return response;
  }

  async update(productName, qty) {
    const response = await this.#db.m_product.update({});
  }
}

module.exports = { ProductRepository };
