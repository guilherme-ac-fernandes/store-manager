const express = require('express');

const ProductsController = require('./controllers/ProductsController');
const SalesController = require('./controllers/SalesController');
const Middlewares = require('./middlewares/index');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// Rotas de Produtos
app.get('/products', ProductsController.getAllProduct);
app.get('/products/:id', ProductsController.getProductById);
app.post('/products', ProductsController.createProduct);
app.put('/products/:id', ProductsController.updateProduct);
app.delete('/products/:id', ProductsController.deleteProduct);

// Rotas de Vendas
app.get('/sales', SalesController.getAllSales);
app.get('/sales/:id', SalesController.getSalesById);
app.post('/sales', SalesController.createSaleProduct);
app.delete('/sales/:id', SalesController.deleteSales);
app.put('/sales/:id', SalesController.updateSales);

// Middleware de Erro Genérico
app.use(Middlewares.error);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;