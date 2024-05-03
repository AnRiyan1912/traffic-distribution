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
      const responseProduct = await productService.getByIdProduct(dataRequest);
      if (!responseProduct[0]) {
        throw new Error("product not found");
      }
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
      const {
        id,
        vendor_id,
        nama_product,
        tanggal_masuk,
        modal,
        qty,
        harga_jual,
        is_active,
        created_at,
        updated_at,
      } = req.body;
    } catch (err) {}
  },
};

module.exports = { productController };
