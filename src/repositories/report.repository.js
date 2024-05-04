const db = require("../db/prisma.config");

class ReportRepository {
  #db;
  constructor() {
    this.#db = db.client;
  }

  async create(productId, qty, profit) {
    return this.#db.m_report.create({
      data: { product_id: productId, qty: qty, profit: profit },
    });
  }
}

module.exports = { ReportRepository };
