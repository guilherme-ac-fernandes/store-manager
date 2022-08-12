const sinon = require("sinon");
const { expect } = require("chai");

const ProductsModel = require("../../../models/ProductsModel");
const SalesModel = require("../../../models/SalesModel");
const SalesService = require("../../../services/SalesService");

describe("Testes no SalesService", () => {
  describe("1. ", () => {
    describe("caso de falha", () => {
      before(async () => {
        sinon.stub(ProductsModel, "getProductById").resolves(null);
      });

      after(async () => ProductsModel.getProductById.restore());

      it("productId undefined => retorna um objeto com as chaves code e message", async () => {
        const response = await SalesService.createSaleProduct([{ quantity: 1 }]);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "message");
        expect(response.code).to.be.equal(400);
        expect(response.message).to.be.equal('"productId" is required');
      });

      it("quantity undefined => retorna um objeto com as chaves code e message", async () => {
        const response = await SalesService.createSaleProduct([{ productId: 1 }]);
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
        expect(response.message).to.be.equal("\"quantity\" must be greater than or equal to 1");
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
        const response = await SalesService.createSaleProduct(payload.data.itemsSold);
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
});

