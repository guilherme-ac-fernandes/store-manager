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

const getAllSales = async () => {
  const query = `
    SELECT 
      sale_id AS saleId,
      'date',
      product_id AS productId,
      quantity 
    FROM StoreManager.sales_products as sp
    JOIN StoreManager.sales as s
    ON sp.sale_id = s.id
    ORDER BY saleId, productId;
  `;
  const [sales] = await connection.query(query);
  if (sales.length === 0) return null;
  return sales;
};

const getSalesById = async (idSale) => {
  const query = `
    SELECT date, product_id AS productId, quantity FROM StoreManager.sales_products as sp
    JOIN StoreManager.sales as s
    ON sp.sale_id = s.id
    WHERE sp.sale_id = ?;
  `;
  const [sales] = await connection.query(query, [idSale]);
  if (!sales || sales.length === 0) return null;
  return sales;
};

module.exports = {
  createSale,
  createSaleProduct,
  getAllSales,
  getSalesById,
};
