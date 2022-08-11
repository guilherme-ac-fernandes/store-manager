const sinon = require("sinon");
const { expect } = require("chai");

const ProductsService = require('../../../services/ProductsService');
const ProductsController = require("../../../controllers/ProductsController");

describe("Testes no ProductsService", () => {
  describe("1. Retorna todos os produtos", () => {
    // Impplementação da função next proveniente da dúvida do Rafael Moraes
    // com o suporte do Instrutor Guilherme de Souza
    // source: https://trybecourse.slack.com/archives/C02TH6V3MC5/p1660249008853309
    describe("caso de falha", () => {
      const request = {};
      const response = {};
      let next = () => {};
      const payload = { code: 404, message: "Product not found" };

      before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(ProductsService, "getAllProduct").resolves(payload);
      });

      after(async () => ProductsService.getAllProduct.restore());

      it("é utilizado o next para mandar um erro com code e message", async () => {
        await ProductsController.getAllProduct(request, response, next);
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
            id: 1,
            name: "Martelo de Thor",
          },
        ],
      };

      before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(ProductsService, "getAllProduct").resolves(payload);
      });

      after(async () => ProductsService.getAllProduct.restore());

      it("é chamado o status com o código 200", async () => {
        await ProductsController.getAllProduct(request, response, next);
        expect(response.status.calledWith(payload.code)).to.be.true;
      });

      it('é retornado um array de produtos', async () => {
        await ProductsController.getAllProduct(request, response, next);
        expect(response.json.calledWith(payload.data)).to.be.true;
      });
    });
  });

  describe("2. Retorna produto pelo id", () => {
    describe("caso de falha", () => {
      const request = {};
      const response = {};
      let next = () => {};
      const payload = { code: 404, message: "Product not found" };

      before(async () => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(ProductsService, "getProductById").resolves(payload);
      });

      after(async () => ProductsService.getProductById.restore());

      it("é utilizado o next para mandar um erro com code e message", async () => {
        await ProductsController.getProductById(request, response, next);
        expect(next.calledWith(payload)).to.be.true;
      });
    });
      

    describe("caso de sucesso", () => {
       const request = {};
       const response = {};
       let next = () => {};
       const payload = {
         code: 200,
         data: {
            id: 1,
            name: "Martelo de Thor",
          },
       };

      before(async () => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(ProductsService, "getProductById").resolves(payload);
       });

       after(async () => ProductsService.getProductById.restore());

       it("é chamado o status com o código 200", async () => {
         await ProductsController.getProductById(request, response, next);
         expect(response.status.calledWith(payload.code)).to.be.true;
       });

       it("é retornado um array de produtos", async () => {
         await ProductsController.getProductById(request, response, next);
         expect(response.json.calledWith(payload.data)).to.be.true;
       });
    });
  });

  describe("3. Insere um novo produto ao Banco de Dados", () => {
    
    describe("caso de falha", () => {
      const request = {};
      const response = {};
      let next = () => {};
      const payload = { code: 400, message: '"name" is required' };

      before(async () => {
        request.body = { name: 'algo' };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(ProductsService, "createProduct").resolves(payload);
      });

      after(async () => ProductsService.createProduct.restore());

      it("é utilizado o next para mandar um erro com code e message", async () => {
        await ProductsController.createProduct(request, response, next);
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
          id: 1,
          name: "Escudo do Capitão América",
        },
      };

      before(async () => {
        request.body = { name: "Escudo do Capitão América" };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(ProductsService, "createProduct").resolves(payload);
      });

      after(async () => ProductsService.createProduct.restore());

      it("é chamado o status com o código 201", async () => {
        await ProductsController.createProduct(request, response, next);
        expect(response.status.calledWith(payload.code)).to.be.true;
      });

      it("é retornado um array de produtos", async () => {
        await ProductsController.createProduct(request, response, next);
        expect(response.json.calledWith(payload.data)).to.be.true;
      });
    });
  });
});
