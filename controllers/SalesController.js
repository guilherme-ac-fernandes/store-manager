const rescue = require('express-rescue');
const SalesService = require('../services/SalesService');

const createSalesProducts = rescue(async (req, res, next) => {
  const { code, data, message } = await SalesService.createSaleProduct(
    req.body,
  );
  if (message) return next({ code, message });
  return res.status(code).json(data);
});

module.exports = {
  createSalesProducts,
};
