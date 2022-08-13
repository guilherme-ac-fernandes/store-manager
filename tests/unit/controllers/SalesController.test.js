const sinon = require("sinon");
const { expect } = require("chai");

const SalesService = require("../../../services/SalesService");
const SalesController = require("../../../controllers/SalesController");

describe("Testes no SalesController", () => {
  describe("1. Retorna dos dados de venda realizada", () => {
    describe("caso de falha", () => {
      const request = {};
      const response = {};
      let next = () => {};
      const payload = { code: 400, message: '"productId" is required' };

      before(async () => {
        request.body = [{ quantity: 1 }];
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(SalesService, "createSaleProduct").resolves(payload);
      });

      after(async () => SalesService.createSaleProduct.restore());

      it("é utilizado o next para mandar um erro com code e message", async () => {
        await SalesController.createSaleProduct(request, response, next);
        expect(next.calledWith(payload)).to.be.true;
      });

    });

    describe("caso de sucesso", () => {
      const request = {};
      const response = {};
      let next = () => {};
      const payload = {
        code: 201,
        data: {
          id: 3,
          itemsSold: [{
            productId: 1,
            quantity: 1,
          }],
        },
      };

      before(async () => {
        request.body = [{ productId: 1, quantity: 1 }];
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(SalesService, "createSaleProduct").resolves(payload);
      });

      after(async () => SalesService.createSaleProduct.restore());

      it("é chamado o status com o código 201", async () => {
        await SalesController.createSaleProduct(request, response, next);
        expect(response.status.calledWith(payload.code)).to.be.true;
      });

      it("é retornado um objeto com as informações da venda", async () => {
        await SalesController.createSaleProduct(request, response, next);
        expect(response.json.calledWith(payload.data)).to.be.true;
      });
    });
  });

  describe("2. Retorna todos as vendas", () => {
    describe("caso de falha", () => {
      const request = {};
      const response = {};
      let next = () => {};
      const payload = { code: 404, message: "Sale not found" };

      before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(SalesService, "getAllSales").resolves(payload);
      });

      after(async () => SalesService.getAllSales.restore());

      it("é utilizado o next para mandar um erro com code e message", async () => {
        await SalesController.getAllSales(request, response, next);
        expect(next.calledWith(payload)).to.be.true;
      });
    });

    describe("caso de sucesso", () => {
      const request = {};
      const response = {};
      let next = () => {};
      const payload = {
        code: 200,
        data: [
          {
            saleId: 1,
            date: "2021-09-09T04:54:29.000Z",
            productId: 1,
            quantity: 2,
          },
        ],
      };

      before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(SalesService, "getAllSales").resolves(payload);
      });

      after(async () => SalesService.getAllSales.restore());

      it("é chamado o status com o código 200", async () => {
        await SalesController.getAllSales(request, response, next);
        expect(response.status.calledWith(payload.code)).to.be.true;
      });

      it("é retornado um array de produtos", async () => {
        await SalesController.getAllSales(request, response, next);
        expect(response.json.calledWith(payload.data)).to.be.true;
      });
    });
    
  });

  describe("3. Retorna todos as vendas especificando o id", () => {
    describe("caso de falha", () => {
      const request = {};
      const response = {};
      let next = () => {};
      const payload = { code: 404, message: "Sale not found" };

      before(async () => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(SalesService, "getSalesById").resolves(payload);
      });

      after(async () => SalesService.getSalesById.restore());

      it("é utilizado o next para mandar um erro com code e message", async () => {
        await SalesController.getSalesById(request, response, next);
        expect(next.calledWith(payload)).to.be.true;
      });
    });

    describe("caso de sucesso", () => {
      const request = {};
      const response = {};
      let next = () => {};
      const payload = {
        code: 200,
        data: [
          {
            date: "2021-09-09T04:54:29.000Z",
            productId: 1,
            quantity: 2,
          },
        ],
      };

      before(async () => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(SalesService, "getSalesById").resolves(payload);
      });

      after(async () => SalesService.getSalesById.restore());

      it("é chamado o status com o código 200", async () => {
        await SalesController.getSalesById(request, response, next);
        expect(response.status.calledWith(payload.code)).to.be.true;
      });

      it("é retornado um array de produtos", async () => {
        await SalesController.getSalesById(request, response, next);
        expect(response.json.calledWith(payload.data)).to.be.true;
      });
    });
  });

  describe("5. Deleta uma venda", () => {
    describe("caso de falha", () => {
      const request = {};
      const response = {};
      let next = () => {};
      const payload = { code: 404, message: "Sale not found" };

      before(async () => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(SalesService, "deleteSales").resolves(payload);
      });

      after(async () => SalesService.deleteSales.restore());

      it("é utilizado o next para mandar um erro com code e message", async () => {
        await SalesController.deleteSales(request, response, next);
        expect(next.calledWith(payload)).to.be.true;
      });
    });

    describe("caso de sucesso", () => {
      const request = {};
      const response = {};
      let next = () => {};
      const payload = {
        code: 204,
        data: { id: 1 },
      };

      before(async () => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(SalesService, "deleteSales").resolves(payload);
      });

      after(async () => SalesService.deleteSales.restore());

      it("é chamado o status com o código 204", async () => {
        await SalesController.deleteSales(request, response, next);
        expect(response.status.calledWith(payload.code)).to.be.true;
      });
    });
  });
});
