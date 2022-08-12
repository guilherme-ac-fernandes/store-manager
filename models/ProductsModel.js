const connection = require('./connection');

const getAllProduct = async () => {
  const query = `
    SELECT * FROM StoreManager.products
    ORDER BY id
  `;
  const [products] = await connection.query(query);
  if (products.length === 0) return null;
  return products;
};

const getProductById = async (idProduct) => {
  const query = `
    SELECT * FROM StoreManager.products
    WHERE id = ?
  `;
  const [[product]] = await connection.query(query, [idProduct]);
  if (!product || product.length === 0) return null;
  return product;
};

const createProduct = async (name) => {
  const query = `
    INSERT INTO StoreManager.products (name) 
    VALUES (?)
  `;
  const [{ insertId }] = await connection.query(query, [name]);
  return { id: insertId, name };
};

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
};