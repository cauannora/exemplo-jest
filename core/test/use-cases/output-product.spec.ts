import { OutputProductUseCase } from "@application/use-cases/output-product.use-case";
import { ControlEntity } from "@domain/models/control.entity";
import { ControlActionEnum } from "@domain/models/enum/control-action.enum";
import { ProductEntity } from "@domain/models/product.entity";
import { ProviderEntity } from "@domain/models/provider.entity";
import { ErrorProtocol } from "@domain/protocols/error.protocol";
import { IFindProductByIdRepository } from "@domain/repositories/find-product-by-id.repository";
import { IManageControlRepository } from "@domain/repositories/manage-control.repository";
import { IUpdateProductRepository } from "@domain/repositories/update-product.repository";

describe("SAIDA DE PRODUTOS", () => {
  let product: ProductEntity, control: ControlEntity, provider: ProviderEntity;
  let findProductByIdRepo: IFindProductByIdRepository;
  let updateProductRepo: IUpdateProductRepository;
  let manageControlRepo: IManageControlRepository;

  beforeEach(() => {
    findProductByIdRepo = {
      execute: jest.fn(),
    };
    updateProductRepo = {
      execute: jest.fn(),
    };
    manageControlRepo = {
      execute: jest.fn(),
    };

    provider = {
      id: 1,
      name: "teste",
      phoneNumber: "123123123",
      responsibleName: "testee",
      address: "teste",
    };

    product = {
      id: 1,
      description: "Product description",
      name: "Product name",
      price: 10,
      minStockLevel: 1,
      stockLevel: 10,
      provider,
    };

    control = new ControlEntity({
      action: ControlActionEnum.INPUT,
      product,
      createdAt: new Date(),
      updatedAt: new Date(),
      quantity: 10,
      id: 1,
    });
  });

  it("Deve registrar uma saída de produto e atualizar o nível do estoque - HAPPY END", () => {
    product.stockLevel = 10;
    updateProductRepo = {
      execute: jest.fn().mockImplementation(() => {
        product.stockLevel = product.stockLevel - 5;
        return product;
      }),
    };
    findProductByIdRepo = {
      execute: jest.fn().mockReturnValue(product),
    };
    manageControlRepo = {
      execute: jest.fn().mockReturnValue(control),
    };

    const outputProductUseCase = new OutputProductUseCase(
      manageControlRepo,
      findProductByIdRepo,
      updateProductRepo
    );
    const sut = outputProductUseCase.execute(1, 5);
    expect(sut).toBeInstanceOf(ControlEntity);
    expect(sut.product.stockLevel).toBe(5);
    expect(updateProductRepo.execute).toBeCalledTimes(1);
    expect(manageControlRepo.execute).toBeCalledTimes(1);
    expect(findProductByIdRepo.execute).toBeCalledTimes(1);
  });

  it("Não deve registrar entrada caso o produto não exista", () => {
    const outputProductUseCase = new OutputProductUseCase(
      manageControlRepo,
      findProductByIdRepo,
      updateProductRepo
    );
    try {
      const sut = outputProductUseCase.execute(1, 10);
      expect(sut).toBeUndefined();
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorProtocol);
      expect((error as ErrorProtocol).name).toBe("Product not found");
      expect((error as ErrorProtocol).message).toBe("Product not found");
      expect(findProductByIdRepo.execute).toBeCalledTimes(1);
      expect(updateProductRepo.execute).toBeCalledTimes(0);
      expect(manageControlRepo.execute).toBeCalledTimes(0);
    }
  });

  it("Não deve registrar entrada caso o produto não tenha nível de estoque", () => {
    product.stockLevel = 1;

    const outputProductUseCase = new OutputProductUseCase(
      manageControlRepo,
      findProductByIdRepo,
      updateProductRepo
    );

    try {
      const sut = outputProductUseCase.execute(1, 5);
      expect(sut).toBeUndefined();
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorProtocol);
      expect((error as ErrorProtocol).name).toBe("Product not found");
      expect((error as ErrorProtocol).message).toBe("Product not found");
      expect(findProductByIdRepo.execute).toBeCalledTimes(1);
      expect(updateProductRepo.execute).toBeCalledTimes(0);
      expect(manageControlRepo.execute).toBeCalledTimes(0);
    }
  });
});
