const sinon = require("sinon");
const { expect } = require("chai");

const connection = require('../../../models/connection');
const ProductsModel = require('../../../models/ProductsModel');

describe("Testes no ProductModel", () => {
  
  describe("1. Retorna todos os produtos", () => {
    describe("caso de falha", () => {
      before(async () => {
        const execute = [[]];
        sinon.stub(connection, "query").resolves(execute);
      });

      after(async () => connection.query.restore());

      it("retorna null", async () => {
        const response = await ProductsModel.getAllProduct();
        expect(response).to.be.equal(null);
      });
    });

    describe("caso de sucesso", () => {
      before(async () => {
        const execute = [
          [
            {
              id: 1,
              name: "Martelo de Thor",
            },
          ],
        ];
        sinon.stub(connection, "query").resolves(execute);
      });

      after(async () => connection.query.restore());

      it("retorna um array", async () => {
        const response = await ProductsModel.getAllProduct();
        expect(response).to.be.a("array");
      });

      it("o primeiro elemente tem as chaves id e name", async () => {
        const response = await ProductsModel.getAllProduct();
        expect(response[0]).to.be.not.empty;
        expect(response[0]).to.have.a.property("id");
        expect(response[0]).to.include.all.keys("id", "name");
      });
    });
  });

  describe("2. Retorna produto pelo id", () => {
    describe("caso de falha", () => {
      before(async () => {
        const execute = [[]];
        sinon.stub(connection, "query").resolves(execute);
      });

      after(async () => connection.query.restore());

      it("retorna null", async () => {
        const response = await ProductsModel.getProductById(1);
        expect(response).to.be.equal(null);
      });
    });

    describe("caso de sucesso", () => {
      before(async () => {
        const execute = [
          [
            {
              id: 1,
              name: "Martelo de Thor",
            },
          ],
        ];
        sinon.stub(connection, "query").resolves(execute);
      });

      after(async () => connection.query.restore());

      it("retorna um array", async () => {
        const response = await ProductsModel.getProductById(1);
        expect(response).to.be.a("object");
      });

      it("o primeiro elemente tem as chaves id e name", async () => {
        const response = await await ProductsModel.getProductById(1);
        expect(response).to.be.not.empty;
        expect(response).to.have.a.property("id");
        expect(response).to.include.all.keys("id", "name");
      });
    });
  });
  
});
