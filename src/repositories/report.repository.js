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

  async findByYesterdayDate(yesterdayDate, productName) {
    return await this.#db.$queryRaw`SELECT * FROM m_report
                                     JOIN m_product ON m_report.product_id = m_product.id
                                     JOIN m_vendor ON m_product.vendor_id = m_vendor.id
                                     WHERE m_report.created_at >= ${yesterdayDate} 
                                     AND m_product.nama_product = ${productName} `;
  }

  async countTransactionTotal(product_id) {
    return await this.#db.m_report.count({ where: { product_id: product_id } });
  }

  async findByDate(dateFrom, dateTo) {
    return await this.#db.$queryRaw`
      SELECT mr.id, mp.nama_product, mp.id as product_id, mv.nama_vendor, mv.id as nama_vendor, 
      mr.qty, mp.modal, mp.harga_jual, mr.profit, CONVERT_TZ(mr.created_at, '+00:00', '+07:00') AS order_date FROM m_report mr
      JOIN m_product mp ON mr.product_id = mp.id
      JOIN m_vendor mv ON mp.vendor_id = mv.id
      WHERE mr.created_at >= ${dateFrom}
      AND mr.created_at <= ${dateTo}
      ORDER BY mr.created_at DESC
    `;
  }
}

module.exports = { ReportRepository };
