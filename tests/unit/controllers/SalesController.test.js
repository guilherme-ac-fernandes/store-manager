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
});
