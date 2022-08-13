const sinon = require("sinon");
const { expect } = require("chai");

const ProductsModel = require("../../../models/ProductsModel");
const SalesModel = require("../../../models/SalesModel");
const SalesService = require("../../../services/SalesService");

describe("Testes no SalesService", () => {
  describe("1. Insere nova venda no Banco de Dados Sales", () => {
    describe("caso de falha", () => {
      before(async () => {
        sinon.stub(ProductsModel, "getProductById").resolves(null);
      });

      after(async () => ProductsModel.getProductById.restore());

      it("productId undefined => retorna um objeto com as chaves code e message", async () => {
        const response = await SalesService.createSaleProduct([
          { quantity: 1 },
        ]);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "message");
        expect(response.code).to.be.equal(400);
        expect(response.message).to.be.equal('"productId" is required');
      });

      it("quantity undefined => retorna um objeto com as chaves code e message", async () => {
        const response = await SalesService.createSaleProduct([
          { productId: 1 },
        ]);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "message");
        expect(response.code).to.be.equal(400);
        expect(response.message).to.be.equal('"quantity" is required');
      });

      it("quantity nulo => retorna um objeto com as chaves code e message", async () => {
        const response = await SalesService.createSaleProduct([
          { productId: 1, quantity: 0 },
        ]);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "message");
        expect(response.code).to.be.equal(422);
        expect(response.message).to.be.equal(
          '"quantity" must be greater than or equal to 1'
        );
      });

      it("productId não criado => retorna um objeto com as chaves code e message", async () => {
        const response = await SalesService.createSaleProduct([
          { productId: 5, quantity: 2 },
        ]);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "message");
        expect(response.code).to.be.equal(404);
        expect(response.message).to.be.equal("Product not found");
      });
    });

    describe("caso de sucesso", () => {
      const payload = {
        code: 201,
        data: {
          id: 3,
          itemsSold: [
            {
              productId: 1,
              quantity: 1,
            },
          ],
        },
      };

      before(async () => {
        sinon.stub(ProductsModel, "getProductById").resolves(true);
        sinon.stub(SalesModel, "createSale").resolves(3);
        sinon
          .stub(SalesModel, "createSaleProduct")
          .resolves({ message: "Insert into Sales_product was a sucess" });
      });

      after(async () => {
        ProductsModel.getProductById.restore();
        SalesModel.createSaleProduct.restore();
        SalesModel.createSale.restore();
      });

      it("venda realizada com sucesso => codigo 201", async () => {
        const response = await SalesService.createSaleProduct(
          payload.data.itemsSold
        );
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "data");
        expect(response.code).to.be.equal(payload.code);
        expect(response.data).to.include.all.keys("id", "itemsSold");
        expect(response.data.id).to.be.equal(3);
        expect(response.data.itemsSold).to.be.a("array");
        expect(response.data.itemsSold).to.be.equal(payload.data.itemsSold);
      });
    });
  });

  describe("2. Retorna todos as vendas", () => {
    describe("caso de falha", () => {
      before(async () => {
        sinon.stub(SalesModel, "getAllSales").resolves(null);
      });

      after(async () => SalesModel.getAllSales.restore());

      it("retorna um objeto com as chaves code e message", async () => {
        const response = await SalesService.getAllSales();
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "message");
        expect(response.code).to.be.equal(404);
        expect(response.message).to.be.equal("Sale not found");
      });
    });

    describe("caso de sucesso", () => {
      const payload = [
        {
          saleId: 1,
          date: "2021-09-09T04:54:29.000Z",
          productId: 1,
          quantity: 2,
        },
      ];

      before(async () => {
        sinon.stub(SalesModel, "getAllSales").resolves(payload);
      });

      after(async () => SalesModel.getAllSales.restore());

      it("retorna o array das sales", async () => {
        const response = await SalesService.getAllSales();
        expect(response).to.include.all.keys("code", "data");
        expect(response.code).to.be.equal(200);
        expect(response.data).to.be.equal(payload);
      });
    });
  });

  describe("3. Retorna todos as vendas especificando o id", () => {
    describe("caso de falha", () => {
      before(async () => {
        sinon.stub(SalesModel, "getSalesById").resolves(null);
      });

      after(async () => SalesModel.getSalesById.restore());

      it("retorna um objeto com as chaves code e message", async () => {
        const response = await SalesService.getSalesById(1);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "message");
        expect(response.code).to.be.equal(404);
        expect(response.message).to.be.equal("Sale not found");
      });
    });

    describe("caso de sucesso", () => {
      const payload = [
        {
          date: "2021-09-09T04:54:29.000Z",
          productId: 1,
          quantity: 2,
        },
      ];

      before(async () => {
        sinon.stub(SalesModel, "getSalesById").resolves(payload);
      });

      after(async () => SalesModel.getSalesById.restore());

      it("retorna o array das sales", async () => {
        const response = await SalesService.getSalesById(1);
        expect(response).to.include.all.keys("code", "data");
        expect(response.code).to.be.equal(200);
        expect(response.data).to.be.equal(payload);
      });
    });
  });

  describe("4. Deleta uma venda", () => {
    describe("caso de falha", () => {
      before(async () => {
        sinon.stub(SalesService, "getSalesById").resolves(null);
      });

      after(async () => SalesService.getSalesById.restore());

      it("produto não existe => retorna um objeto com as chaves code e message", async () => {
        const response = await SalesService.deleteSales(1);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "message");
        expect(response.code).to.be.equal(404);
        expect(response.message).to.be.equal("Sale not found");
      });
    });

    describe("caso de sucesso", () => {
      const payload = {
        code: 204,
        data: { id: 1 },
      };
      before(async () => {
        sinon.stub(SalesModel, "getSalesById").resolves(true);
        sinon.stub(SalesModel, "deleteSales").resolves({});
      });

      after(async () => {
        SalesModel.getSalesById.restore();
        SalesModel.deleteSales.restore();
      });

      it("o produto é deletado", async () => {
        const response = await SalesService.deleteSales(1);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "data");
        expect(response.code).to.be.equal(payload.code);
        expect(response.data.id).to.be.equal(1);
      });
    });
  });
});

