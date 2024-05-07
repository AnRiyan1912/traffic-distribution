const vendorService = require("../services/vendor.service");

const service = new vendorService.VendorService();

const vendorController = {
  create: async (req, res) => {
    try {
      const data = { vendorName: req.body.nama_vendor };
      const response = await service.createVendor(data);
      res
        .status(200)
        .json({ message: "success create vendor", data: response });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = { vendorController };
