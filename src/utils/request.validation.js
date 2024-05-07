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

const validationProductGetById = (productId, vendorId) => {
  if (!productId) {
    throw new Error("productId is required");
  }
  if (!vendorId) {
    throw new Error("vendorId is required");
  }
};

const validationProductPriceGetById = (data) => {
  if (!data.productId) {
    throw new Error("product_id is required");
  }
};

const validationUpdateProduct = (data) => {
  if (!data.id) {
    throw new Error("id is required");
  }
  if (!data.vendorId) {
    throw new Error("vendor_id is required");
  }
  if (!data.productName) {
    throw new Error("nama_product is required");
  }
  if (!data.dateOfEntry) {
    throw new Error("tanggal_masuk is required");
  }
  if (!data.modal) {
    throw new Error("modal is required");
  }
  if (data.qty < 0 || data.qty === undefined) {
    throw new Error("qty is required");
  }
  if (!data.sellingPrice) {
    throw new Error("selling_price is required");
  }
  if (!data.isActive) {
    throw new Error("is_active is required");
  }
  if (!data.createdAt) {
    throw new Error("created_at is required");
  }
  if (!data.updatedAt) {
    throw new Error("updated_at is required");
  }
};

const validationOrder = (data) => {
  if (!data.productId) {
    throw new Error("product_id is required");
  }
  if (!data.qty) {
    throw new Error("qty is required");
  }
};

module.exports = {
  validationVendor,
  validationProduct,
  validationProductPriceGetById,
  validationProductGetById,
  validationUpdateProduct,
  validationOrder,
};
