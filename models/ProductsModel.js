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

const updateProduct = async (idProduct, name) => {
  const query = `
    UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?;
  `;
  const [{ affectedRows }] = await connection.query(query, [
    name,
    idProduct,
  ]);
  return { affectedRows };
};

const deleteProduct = async (idProduct) => {
  const query = `
    DELETE FROM StoreManager.products
    WHERE id = ?;
  `;
  const [{ affectedRows }] = await connection.query(query, [idProduct]);
  return { affectedRows };
};

const searchProducts = async (search) => {
  const query = `
    SELECT * FROM StoreManager.products
    WHERE name LIKE ?
  `;
  const searchLike = `%${search}%`;
  const [products] = await connection.query(query, [searchLike]);
  if (products.length === 0) return null;
  return products;
};

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};