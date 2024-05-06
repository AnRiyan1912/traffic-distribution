const { ReportRepository } = require("../repositories/report.repository");
const { getDateFormatDb, getYesterdayDate } = require("../utils/getDate");
const { ProductService } = require("./product.service");
const moment = require("moment-timezone");

class ReportService {
  #reportRepository;
  #productService;
  constructor() {
    this.#reportRepository = new ReportRepository();
    this.#productService = new ProductService();
  }

  async createReport(productId, qty) {
    const findProduct = await this.#productService.getByProductId(productId);
    const hppPerUnit = findProduct.modal / findProduct.qty;
    const totalIncome = findProduct.harga_jual * qty;
    const profit = totalIncome - hppPerUnit * qty;
    return await this.#reportRepository.create(productId, qty, profit);
  }

  async findByYesterdayDate(productName) {
    const yesterdayDate = getYesterdayDate();
    return await this.#reportRepository.findByYesterdayDate(
      yesterdayDate,
      productName
    );
  }

  async countTransactionTotal(productId) {
    return await this.#reportRepository.countTransactionTotal(productId);
  }

  async getTransactionByDate(dateFrom, dateTo) {
    const dateFromUTC = moment
      .tz(dateFrom, "YYYY-MM-DD", "UTC")
      .format("YYYY-MM-DD");
    const dateToUTC = moment
      .tz(dateTo, "YYYY-MM-DD", "UTC")
      .format("YYYY-MM-DD");
    console.log(dateFromUTC, dateToUTC);
    return await this.#reportRepository.findByDate(dateFromUTC, dateToUTC);
  }
}

module.exports = { ReportService };
