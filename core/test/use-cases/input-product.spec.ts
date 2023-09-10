import { InputProductUseCase } from "@application/use-cases/input-product.use-case";
import { ControlEntity } from "@domain/models/control.entity";
import { ControlActionEnum } from "@domain/models/enum/control-action.enum";
import { ProductEntity } from "@domain/models/product.entity";
import { ProviderEntity } from "@domain/models/provider.entity";
import { ErrorProtocol } from "@domain/protocols/error.protocol";
import { IFindProductByIdRepository } from "@domain/repositories/find-product-by-id.repository";
import { IManageControlRepository } from "@domain/repositories/manage-control.repository";
import { IUpdateProductRepository } from "@domain/repositories/update-product.repository";

describe("ENTRADA DE PRODUTOS", () => {
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

  it("Deve registrar uma entrada de produto e atualizar o nível do estoque - HAPPY END", () => {
    product.stockLevel = 10;
    updateProductRepo = {
      execute: jest.fn().mockReturnValue({ ...product, stockLevel: 20 }),
    };
    findProductByIdRepo = {
      execute: jest.fn().mockReturnValue(product),
    };
    manageControlRepo = {
      execute: jest.fn().mockReturnValue(control),
    };

    const inputProductUseCase = new InputProductUseCase(
      manageControlRepo,
      findProductByIdRepo,
      updateProductRepo
    );
    const sut = inputProductUseCase.execute(1, 10);
    expect(sut).toBeInstanceOf(ControlEntity);
    expect(sut.product.stockLevel).toBe(20);
    expect(updateProductRepo.execute).toBeCalledTimes(1);
    expect(manageControlRepo.execute).toBeCalledTimes(1);
    expect(findProductByIdRepo.execute).toBeCalledTimes(1);
  });

  it("Não deve registrar entrada caso o produto não exista", () => {
    const inputProductUseCase = new InputProductUseCase(
      manageControlRepo,
      findProductByIdRepo,
      updateProductRepo
    );
    try {
      const sut = inputProductUseCase.execute(1, 10);
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
