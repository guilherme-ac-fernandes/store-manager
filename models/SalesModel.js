const connection = require('./connection');

const createSale = async () => {
  const [{ insertId: id }] = await connection.query(`
    INSERT INTO StoreManager.sales (date) VALUES (NOW())
  `);
  return id;
};

const createSaleProduct = async (id, { productId, quantity }) => {
  await connection.query(`
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)
  `, [id, productId, quantity]);
};

module.exports = {
  createSale,
  createSaleProduct,
};