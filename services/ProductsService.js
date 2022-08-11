const ProductService = require('../models/ProductsModel');

const getAllProduct = async () => {
  const products = await ProductService.getAllProduct();
  if (products === null) {
    return { code: 404, message: 'Product not found' };
  }
  return { code: 200, data: products };
};

const getProductById = async (idProduct) => {
  const product = await ProductService.getProductById(idProduct);
  if (product === null) {
    return { code: 404, message: 'Product not found' };
  }
  return { code: 200, data: product };
};

module.exports = {
  getAllProduct,
  getProductById,
};