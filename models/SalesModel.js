const connection = require('./connection');

const createSale = async () => {
  const [{ insertId }] = await connection.query(`
    INSERT INTO StoreManager.sales (date) VALUES (NOW())
  `);
  return insertId;
};

const createSaleProduct = async (id, { productId, quantity }) => {
  await connection.query(`
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)
  `, [id, productId, quantity]);
  return { message: 'Insert into Sales_product was a sucess' };
};

module.exports = {
  createSale,
  createSaleProduct,
};