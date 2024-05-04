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

  async checkExistVendor(vendorName) {
    const response = await this.#db
      .$queryRaw`SELECT * FROM m_vendor WHERE nama_vendor = ${vendorName}`;

    return response;
  }

  async getById(vendorId) {
    const response = await this.#db.m_vendor.findUnique({
      where: { id: vendorId },
    });

    return response;
  }
}

module.exports = { VendorRepository };
