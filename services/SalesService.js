const SalesModel = require('../models/SalesModel');
const {
  validateQuantityAndProduct,
  validateIfSaleExists,
} = require('./validations');

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

const getAllSales = async () => {
  const sales = await SalesModel.getAllSales();
  if (sales === null) {
    return { code: 404, message: 'Sale not found' };
  }
  return { code: 200, data: sales };
};

const getSalesById = async (idSale) => {
  const sales = await SalesModel.getSalesById(idSale);
  if (sales === null) {
    return { code: 404, message: 'Sale not found' };
  }
  return { code: 200, data: sales };
};

const deleteSales = async (idSale) => {
  const validation = await validateIfSaleExists(idSale);
  if (validation !== true) return validation;
  await SalesModel.deleteSales(idSale);
  return {
    code: 204,
    data: { id: idSale },
  };
};

module.exports = {
  createSaleProduct,
  getAllSales,
  getSalesById,
  deleteSales,
};
