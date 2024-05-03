const db = require("../db/prisma.config");

class VendorRepository {
  #db;
  constructor() {
    this.#db = db.client;
  }

  async create(vendorName) {
    const saveResponse = await this.#db.m_vendor.create({
      data: {
        nama_vendor: vendorName,
      },
    });

    return saveResponse;
  }
}

module.exports = { VendorRepository };
