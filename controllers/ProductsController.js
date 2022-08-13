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

const updateProduct = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const { code, data, message } = await ProductService.updateProduct(id, name);
  if (message) return next({ code, message });
  return res.status(code).json(data);
});

const deleteProduct = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { code, message } = await ProductService.deleteProduct(id);
  if (message) return next({ code, message });
  return res.status(code).end();
});

const searchProducts = rescue(async (req, res, next) => {
  const { q: search } = req.query;
  const { code, message, data } = await ProductService.searchProducts(search);
  if (message) return next({ code, message });
  return res.status(code).json(data);
});

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};
