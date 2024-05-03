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
    if (checkExistingVendor) {
      throw new Error("vendor already exist");
    }
    return await this.#vendorRepository.create(vendorName);
  }
}

module.exports = { VendorService };
