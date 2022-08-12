const rescue = require('express-rescue');
const ProductService = require('../services/ProductsService');

const getAllProduct = rescue(async (_req, res, next) => {
  const { code, message, data } = await ProductService.getAllProduct();
  if (message) return next({ code, message });
  return res.status(code).json(data);
});

const getProductById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { code, message, data } = await ProductService.getProductById(id);
  if (message) return next({ code, message });
  return res.status(code).json(data);
});

const createProduct = rescue(async (req, res, next) => {
  const { name } = req.body;
  const { code, data, message } = await ProductService.createProduct(name);
  if (message) return next({ code, message });
  return res.status(code).json(data);
});

const createSalesProducts = rescue(async (req, res, next) => {
  const { code, data, message } = await ProductService.createSaleProduct(req.body);
  if (message) return next({ code, message });
  return res.status(code).json(data);
});

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  createSalesProducts,
};
