const ProductsModel = require('../models/ProductsModel');
const { validateName } = require('./validations');

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
  if (validation !== true) return validation;
  const product = await ProductsModel.createProduct(name);
  return { code: 201, data: product };
};

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
};
