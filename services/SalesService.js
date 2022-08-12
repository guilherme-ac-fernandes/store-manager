const SalesModel = require('../models/SalesModel');
const { validateQuantityAndProduct } = require('./validations');

const createSaleProduct = async (itemsSold) => {
  const validation = await validateQuantityAndProduct(itemsSold);
  if (validation !== undefined) return validation;

  const id = await SalesModel.createSale();

  Promise.all(
    itemsSold.map(async (itemSold) => {
      await SalesModel.createSaleProduct(id, itemSold);
    }),
  );

  return { code: 201, data: { id, itemsSold } };
};

module.exports = {
  createSaleProduct,
};
