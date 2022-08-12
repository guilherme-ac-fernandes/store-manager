const ProductsModel = require('../models/ProductsModel');

const validateName = (name) => {
  if (!name || name.length === 0) {
    return { code: 400, message: '"name" is required' };
  }
  if (name.length < 6) {
    return {
      code: 422,
      message: '"name" length must be at least 5 characters long',
    };
  }
};

const validateQuantity = (quantity) => {
  if (quantity === undefined) {
    return { code: 400, message: '"quantity" is required' };
  }
  if (quantity < 1) {
    return {
      code: 422,
      message: '"quantity" must be greater than or equal to 1',
    };
  }
  return true;
};

const validateProductId = (productId) => {
  if (!productId || productId === undefined) {
    return { code: 400, message: '"productId" is required' };
  }
  return true;
};

const validateIfProductExists = async (productId) => {
  const product = await ProductsModel.getProductById(productId);
  if (product === null) return { code: 404, message: 'Product not found' };
  return true;
};

// Aplicação de Promise.all para tratamento de array e assincronidade proveniente do
// 30secondsodcode e do StackOverFlow
// source1: https://www.30secondsofcode.org/articles/s/javascript-async-array-loops
// source2: https://stackoverflow.com/questions/69346491/how-do-i-use-array-each-with-async-await
const validateQuantityAndProduct = async (itemsSold) => Promise
.all(itemsSold.map(async ({ quantity, productId }) => {
  const response1 = validateQuantity(quantity);
  if (response1 !== true) return response1;
  const response2 = validateProductId(productId);
  if (response2 !== true) return response2;
  const response3 = await validateIfProductExists(productId);
  if (response3 !== true) return response3;
})).then((data) => data.find((item) => item !== undefined));

module.exports = {
  validateName,
  validateQuantityAndProduct,
};
