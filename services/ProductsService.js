const ProductsModel = require('../models/ProductsModel');

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
  if (!name || name.length === 0) {
    return { code: 400, message: '"name" is required' };
  }
  if (name.length < 6) {
    return {
      code: 422,
      message: '"name" length must be at least 5 characters long',
    };
  }
  const product = await ProductsModel.createProduct(name);
  return { code: 201, data: product };
};

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
};
