const updateRequestDto = (data, totalBuy) => {
  return {
    id: data.id,
    productId: data.id,
    vendorId: data.vendor_id,
    productName: data.nama_product,
    dateOfEntry: data.tanggal_masuk,
    modal: data.modal,
    qty: data.qty - totalBuy,
    sellingPrice: data.harga_jual,
    isActive: data.is_active,
    hppPerUnit: data.hpp_per_unit,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
};

module.exports = { updateRequestDto };
