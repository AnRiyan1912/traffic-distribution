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

  async findByIdAndVendorId(productId, vendorId) {
    const response = await this.#db
      .$queryRaw`SELECT * FROM m_product WHERE id = ${productId} AND vendor_id=${vendorId}`;
    return response;
  }

  async getAll(vendorId) {
    const response = await this.#db
      .$queryRaw`SELECT * FROM m_product WHERE vendor_id = ${vendorId} AND is_active = true `;
    return response;
  }

  async update(data) {
    const response = await this.#db.m_product.update({
      data: {
        id: data.id,
        nama_product: data.nama_product,
        tanggal_masuk: data.tanggal_masuk,
        modal: data.modal,
        qty: data.qty,
        harga_jual: data.harga_jual,
        is_active: data.is_active,
        created_at: data.created_at,
        updated_at: data.update_at,
      },
    });

    return response;
  }
}

module.exports = { ProductRepository };
