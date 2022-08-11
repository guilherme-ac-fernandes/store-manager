const rescue = require('express-rescue');
const ProductService = require('../services/ProductService');

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

module.exports = {
  getAllProduct,
  getProductById,
};