const ProductsModel = require('../models/ProductsModel');
const {
  validateName,
  validateIfProductExists,
} = require('./validations');

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

const updateProduct = async (idProduct, name) => {
  const validationId = await validateIfProductExists(idProduct);
  if (validationId !== true) return validationId;
  const validationName = validateName(name);
  if (validationName !== true) return validationName;
  await ProductsModel.updateProduct(idProduct, name);
  return {
    code: 200,
    data: { id: idProduct, name },
  };
};

const deleteProduct = async (idProduct) => {
  const validation = await validateIfProductExists(idProduct);
  if (validation !== true) return validation;
  await ProductsModel.deleteProduct(idProduct);
  return {
    code: 204,
    data: { id: idProduct },
  };
};

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
