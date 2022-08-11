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

});
