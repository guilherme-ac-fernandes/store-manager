const Joi = require('joi');
const ProductsModel = require('../models/ProductsModel');
const SalesModel = require('../models/SalesModel');

// Aplicação das validações com Joi utilizando mensagens especificas baseadas na monitoria de Joi
// realizada pelo instrutor MD da turma 20 (Tribo A), juntamente com a lógica de tratamento da
// mensagem e código presente no vídeo postado pelo instrutor Henrique Baêta da turma 20 (tribo B)
// source 1: https://trybecourse.slack.com/archives/C02TH6V3MC5/p1660081203236509
// source 2: https://trybecourse.slack.com/archives/C02TH6V3MC5/p1660324725698589
const nameSchema = Joi.string().min(5).required().messages({
  'string.empty': '400|"name" is required',
  'string.min': '422|"name" length must be at least {#limit} characters long',
  'any.required': '400|"name" is required',
});

const quantitySchema = Joi.number().min(1).required().messages({
  'number.empty': '400|"quantity" is required',
  'number.min': '422|"quantity" must be greater than or equal to {#limit}',
  'any.required': '400|"quantity" is required',
});

const productIdSchema = Joi.number().min(1).required().messages({
  'number.empty': '400|"productId" is required',
  'number.min': '422|"productId" must be greater than or equal to {#limit}',
  'any.required': '400|"productId" is required',
});

// Função genérica para validações
const handleCallback = (schema, variable) => {
  const { error } = schema.validate(variable);
  if (error !== undefined) {
    const [code, message] = error.message.split('|');
    return { code: Number(code), message };
  }
  return true;
};

const validateName = (name) => handleCallback(nameSchema, name);
const validateQuantity = (quantity) => handleCallback(quantitySchema, quantity);
const validateProductId = (productId) =>
  handleCallback(productIdSchema, productId);

const validateIfProductExists = async (productId) => {
  const product = await ProductsModel.getProductById(productId);
  if (product === null) return { code: 404, message: 'Product not found' };
  return true;
};

const validateIfSaleExists = async (saleId) => {
  const product = await SalesModel.getSalesById(saleId);
  if (product === null) return { code: 404, message: 'Sale not found' };
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
  validateQuantity,
  validateProductId,
  validateIfProductExists,
  validateIfSaleExists,
  validateQuantityAndProduct,
};
