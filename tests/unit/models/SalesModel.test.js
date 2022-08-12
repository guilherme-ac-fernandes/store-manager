const sinon = require("sinon");
const { expect } = require("chai");

const connection = require("../../../models/connection");
const SalesModel = require("../../../models/SalesModel");

describe("Testes no SalesModel", () => {
  describe("1. Insere nova venda no Banco de Dados Sales", () => {

    describe("caso de sucesso", () => {
      const execute = [{ insertId: 1 }];
      before(async () => {
        sinon.stub(connection, "query").resolves(execute);
      });

      after(async () => connection.query.restore());

      it("retorna o id com tipo número", async () => {
        const response = await SalesModel.createSale();
        expect(response).to.be.a("number");
        expect(response).to.be.equal(execute[0].insertId);
      });
    });
  });

  describe("1. Insere relação de venda com produto no Banco de Dados Sales_Products", () => {
    const payload = { productId: 1, quantity: 12 };
    describe("caso de sucesso", () => {
      before(async () => {
        const execute = [];
        sinon.stub(connection, "query").resolves(execute);
      });

      after(async () => connection.query.restore());

      it("retorna a mensagem de sucesso", async () => {
        const response = await SalesModel.createSaleProduct(1, payload);
        expect(response).to.be.a("object");
        expect(response.message).to.be.equal(
          "Insert into Sales_product was a sucess"
        );
      });
    });
  });
});
