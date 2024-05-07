const { ReportService } = require("../services/report.service");

const reportService = new ReportService();
const reportController = {
  getReportByDate: async (req, res) => {
    const { dateFrom, dateTo } = req.query;
    try {
      const response = await reportService.getTransactionByDate(
        dateFrom,
        dateTo
      );
      res.status(200).json({ message: "success get reports", data: response });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = { reportController };
