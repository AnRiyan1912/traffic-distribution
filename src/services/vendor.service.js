const vendorRepository = require("../repositories/vendor.repository");
const { validationVendor } = require("../utils/request.validation");

class VendorService {
  #vendorRepository;
  constructor() {
    this.#vendorRepository = new vendorRepository.VendorRepository();
  }

  async createVendor(data) {
    validationVendor(data);
    const { vendorName } = data;
    const checkExistingVendor = await this.#vendorRepository.checkExistVendor(
      vendorName
    );
    if (checkExistingVendor[0]) {
      throw new Error("vendor already exist");
    }
    return await this.#vendorRepository.create(vendorName);
  }

  async getVendorById(vendorId) {
    return await this.#vendorRepository.getById(vendorId);
  }
}

module.exports = { VendorService };
