const rescue = require('express-rescue');
const SalesService = require('../services/SalesService');

const createSaleProduct = rescue(async (req, res, next) => {
  const { code, data, message } = await SalesService.createSaleProduct(
    req.body,
  );
  if (message) return next({ code, message });
  return res.status(code).json(data);
});

const getAllSales = rescue(async (_req, res, next) => {
  const { code, message, data } = await SalesService.getAllSales();
  if (message) return next({ code, message });
  return res.status(code).json(data);
});

const getSalesById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { code, message, data } = await SalesService.getSalesById(id);
  if (message) return next({ code, message });
  return res.status(code).json(data);
});

module.exports = {
  createSaleProduct,
  getAllSales,
  getSalesById,
};
