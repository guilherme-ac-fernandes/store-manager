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

  describe("2. Insere relação de venda com produto no Banco de Dados Sales_Products", () => {
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

  describe("3. Retorna todos as vendas", () => {
    describe("caso de falha", () => {
      before(async () => {
        const execute = [[]];
        sinon.stub(connection, "query").resolves(execute);
      });

      after(async () => connection.query.restore());

      it("retorna null", async () => {
        const response = await SalesModel.getAllSales();
        expect(response).to.be.equal(null);
      });
    });

    describe("caso de sucesso", () => {
      before(async () => {
        const execute = [
          [
            {
              saleId: 1,
              date: "2021-09-09T04:54:29.000Z",
              productId: 1,
              quantity: 2,
            },
          ],
        ];
        sinon.stub(connection, "query").resolves(execute);
      });

      after(async () => connection.query.restore());

      it("retorna um array", async () => {
        const response = await SalesModel.getAllSales();
        expect(response).to.be.a("array");
      });

      it("o primeiro elemente tem as chaves presentes no banco de dados", async () => {
        const response = await SalesModel.getAllSales();
        expect(response[0]).to.be.not.empty;;
        expect(response[0]).to.include.all.keys(
          "saleId",
          "date",
          "productId",
          "quantity"
        );
      });
    });
  });

  describe("4. Retorna todos as vendas especificando o id", () => {
    describe("caso de falha", () => {
      before(async () => {
        const execute = [[]];
        sinon.stub(connection, "query").resolves(execute);
      });

      after(async () => connection.query.restore());

      it("retorna null", async () => {
        const response = await SalesModel.getSalesById(1);
        expect(response).to.be.equal(null);
      });
    });

    describe("caso de sucesso", () => {
      before(async () => {
        const execute = [
          [
            {
              saleId: 1,
              date: "2021-09-09T04:54:29.000Z",
              productId: 1,
              quantity: 2,
            },
          ],
        ];
        sinon.stub(connection, "query").resolves(execute);
      });

      after(async () => connection.query.restore());

      it("retorna um array", async () => {
        const response = await SalesModel.getSalesById(1);
        expect(response).to.be.a("array");
      });

      it("o primeiro elemente tem as chaves presentes no banco de dados", async () => {
        const response = await SalesModel.getSalesById(1);
        expect(response[0]).to.be.not.empty;
        expect(response[0]).to.include.all.keys(
          "saleId",
          "date",
          "productId",
          "quantity"
        );
      });
    });
  });

  describe("5. Deleta uma venda", () => {
    describe("caso de sucesso", () => {
      const payload = [{ affectedRows: 1 }];
      before(async () => {
        sinon.stub(connection, "query").resolves(payload);
      });

      after(async () => connection.query.restore());

      it("deleta dado retornando objeto com affectedRows", async () => {
        const response = await SalesModel.deleteSales(1);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("affectedRows");
        expect(response.affectedRows).to.be.equal(1);
      });
    });
  });

});
