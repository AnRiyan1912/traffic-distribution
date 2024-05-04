const { ProductService } = require("../services/product.service");

const productService = new ProductService();
const productController = {
  create: async (req, res) => {
    try {
      const dataRequest = {
        vendorId: req.body.vendor_id,
        productName: req.body.nama_product,
        modal: req.body.modal,
        qty: req.body.qty,
        sellingPrice: req.body.harga_jual,
      };
      const responseCraeteProduct = await productService.createProduct(
        dataRequest
      );
      res.status(200).json({
        message: "sucess create product",
        data: responseCraeteProduct,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const dataRequest = {
        vendorId: parseInt(req.params.vendorId),
        productId: parseInt(req.params.productId),
      };
      const responseProduct = await productService.getByVendorIdAndProductId(
        dataRequest
      );
      res
        .status(200)
        .json({ message: "success get product", data: responseProduct[0] });
    } catch (err) {
      console.log(err.message);
      if (err.message === "Cannot read properties of null (reading 'id')") {
        res.status(404).json({ message: "product not found" });
      } else {
        res.status(400).json({ message: err.message });
      }
    }
  },

  getAll: async (req, res) => {
    try {
      const vendorId = parseInt(req.params.vendorId);
      const responseGetProduct = await productService.getAllProduct(vendorId);
      res
        .status(200)
        .json({ message: "success get all product", data: responseGetProduct });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const requestUpdate = {
        id: req.body.id,
        vendorId: req.body.vendor_id,
        productName: req.body.nama_product,
        dateOfEntry: req.body.tanggal_masuk,
        modal: req.body.modal,
        qty: req.body.qty,
        sellingPrice: req.body.harga_jual,
        isActive: req.body.is_active,
        createdAt: req.body.created_at,
        updatedAt: req.body.updated_at,
      };

      const response = await productService.updateProduct(requestUpdate);
      res
        .status(200)
        .json({ message: "success update product", data: response });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { productId, vendorId } = req.params;
      await productService.deleteProduct(productId, vendorId);
      res.status(200).json({ message: "success delete product" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = { productController };
