# Store Manager

Consiste em uma API constrída para o gerenciamento de um e-commerce de produtos, com a possibilidade de criar, visualizar, deletar e atualizar produtos e vendas. 

* Contruída com Node.js, Express, MySQL e Docker
* Utilizando as práticas do REST
* Testes realizados com Mocha, Chai e Sinnon
* Aplicada Arquitetura de Software, com as camadas de Modelo, Serviço e de Controladores


### Instruções

- Para rodar o repositório localmente, realize o clone do projeto e utilize os comandos a seguir para inicializar o Docker:

```
docker-compose up -d
docker attach store_manager
npm run migration // comando para criar o banco de dados
npm run seed // comando para popular o banco de dados
```

E utilize os comandos a seguir para executar a aplicação:

```
npm start // para iniciar a aplicação
ou
npm run test:mocha // para executar os testes
```

### Endpoints

#### Produtos
- GET - http://localhost:3000/products
- GET - http://localhost:3000/products/:id
- GET - http://localhost:3000/products/search?q=name
- PUT - http://localhost:3000/products/:id
- POST - http://localhost:3000/products
- DELETE - http://localhost:3000/products/:id

Na requisição do PUT e POST, é necessária o seguinte JSON:

```
{ "name": "Produto ABC" }
```

#### Vendas
- GET - http://localhost:3000/sales
- GET - http://localhost:3000/sales/:id
- PUT - http://localhost:3000/sales/:id
- POST - http://localhost:3000/sales
- DELETE - http://localhost:3000/sales/:id

Na requisição do PUT e POST, é informar a quantidade e o id do produto no formato a seguir:

```
[
  {"productId": 1, "quantity": 2 }, 
  {"productId": 8, "quantity": 28 }
]
```
