const validationVendor = (data) => {
  if (!data.vendorName) {
    throw new Error("nama_vendor is required");
  }
};

const validationProduct = (data) => {
  if (!data.vendorId) {
    throw new Error("vendor_id is required");
  }
  if (!data.productName) {
    throw new Error("nama_product is required");
  }
  if (!data.modal) {
    throw new Error("modal is required");
  }
  if (!data.qty) {
    throw new Error("qty is required");
  }
  if (!data.sellingPrice) {
    throw new Error("harga_jual is required");
  }
};

const validationProductGetById = (data) => {
  if (!data.productId) {
    throw new Error("productId in route is required");
  }
  if (!data.vendorId) {
    throw new Error("vendorId in route is required");
  }
};

const validationProductPriceGetById = (data) => {
  if (!data.productId) {
    throw new Error("product_id is required");
  }
};

module.exports = {
  validationVendor,
  validationProduct,
  validationProductPrice,
  validationProductPriceGetById,
  validationProductGetById,
};
