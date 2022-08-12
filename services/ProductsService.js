const ProductsModel = require('../models/ProductsModel');
const { validateName, validateQuantityAndProduct } = require('./validations');

const getAllProduct = async () => {
  const products = await ProductsModel.getAllProduct();
  if (products === null) {
    return { code: 404, message: 'Product not found' };
  }
  return { code: 200, data: products };
};

const getProductById = async (idProduct) => {
  const product = await ProductsModel.getProductById(idProduct);
  if (product === null) {
    return { code: 404, message: 'Product not found' };
  }
  return { code: 200, data: product };
};

const createProduct = async (name) => {
  const validation = validateName(name);
  if (validation.message) return validation;
  const product = await ProductsModel.createProduct(name);
  return { code: 201, data: product };
};

const createSaleProduct = async (itemsSold) => {
  const validation = await validateQuantityAndProduct(itemsSold);
  if (validation !== undefined) return validation;

  const id = await ProductsModel.createSale();
  
  Promise.all(itemsSold.map(async (itemSold) => {
    await ProductsModel.createSaleProduct(id, itemSold);
  }));
  
  return { code: 201, data: { id, itemsSold } };
};

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  createSaleProduct,
};
