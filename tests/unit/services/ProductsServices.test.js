const sinon = require("sinon");
const { expect } = require("chai");

const ProductsModel = require("../../../models/ProductsModel");
const ProductsService = require('../../../services/ProductsService');

describe("Testes no ProductsService", () => {
  describe("1. Retorna todos os produtos", () => {

    describe("caso de falha", () => {
      before(async () => {
        sinon.stub(ProductsModel, "getAllProduct").resolves(null);
      });

      after(async () => ProductsModel.getAllProduct.restore());

      it("retorna um objeto com as chaves code e message", async () => {
        const response = await ProductsService.getAllProduct();
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "message");
        expect(response.code).to.be.equal(404);
        expect(response.message).to.be.equal("Product not found");
      });
      
    });

    describe("caso de sucesso", () => {
      const payload = [
        {
          id: 1,
          name: "Martelo de Thor",
        },
      ];

      before(async () => {
        sinon.stub(ProductsModel, "getAllProduct").resolves(payload);
      });

      after(async () => ProductsModel.getAllProduct.restore());

      it("retorna o array dos produtos", async () => {
        const response = await ProductsService.getAllProduct();
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "data");
        expect(response.code).to.be.equal(200);
        expect(response.data).to.be.equal(payload);
      });
    });
  });

  describe("2. Retorna produto pelo id", () => {
    describe("caso de falha", () => {
      before(async () => {
        sinon.stub(ProductsModel, "getProductById").resolves(null);
      });

      after(async () => ProductsModel.getProductById.restore());

      it("retorna um objeto com as chaves code e message", async () => {
        const response = await ProductsService.getProductById(1);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "message");
        expect(response.code).to.be.equal(404);
        expect(response.message).to.be.equal("Product not found");
      });
    });

    describe("caso de sucesso", () => {
      const payload = {
        id: 1,
        name: "Martelo de Thor",
      };

      before(async () => {
        sinon.stub(ProductsModel, "getProductById").resolves(payload);
      });

      after(async () => ProductsModel.getProductById.restore());

      it("retorna o array dos produtos", async () => {
        const response = await ProductsService.getProductById(1);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "data");
        expect(response.code).to.be.equal(200);
        expect(response.data).to.be.equal(payload);
      });
    });
  });

  describe("3. Insere um novo produto ao Banco de Dados", () => {

    describe("caso de falha:", () => {

      it("ao não informar o nome do produto, retorne o código 400 com a mensagem relacionada", async () => {
        const response = await ProductsService.createProduct('');
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "message");
        expect(response.code).to.be.equal(400);
        expect(response.message).to.be.equal('"name" is required');
      });

      it("ao informar o nome com menos de 5 caracteres, retorne o código 422 com a mensagem relacionada", async () => {
        const response = await ProductsService.createProduct("bola");
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "message");
        expect(response.code).to.be.equal(422);
        expect(response.message).to.be.equal(
          '"name" length must be at least 5 characters long'
        );
      });

    });

    describe("caso de sucesso", () => {
      const payload = {
        id: 1,
        name: "Escudo do Capitão América",
      };

      before(async () => {
        sinon.stub(ProductsModel, "createProduct").resolves(payload);
      });

      after(async () => ProductsModel.createProduct.restore());

      it("o produto inserido contém o id retornado pelo banco e o nome do produto", async () => {
        const response = await ProductsService.createProduct(payload.name);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "data");
        expect(response.code).to.be.equal(201);
        expect(response.data).to.be.a('object');
        expect(response.data.id).to.be.equal(payload.id);
        expect(response.data.name).to.be.equal(payload.name);
      });
    });
  });

});
