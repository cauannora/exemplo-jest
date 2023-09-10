import { ProductRemoveUseCase } from "@application/use-cases/product-remove.use-case";
import { ControlEntity } from "@domain/models/control.entity";
import { ControlActionEnum } from "@domain/models/enum/control-action.enum";
import { ProductEntity } from "@domain/models/product.entity";
import { ErrorProtocol } from "@domain/protocols/error.protocol";
import { IDeleteProductByIdRepository } from "@domain/repositories/delete-product-by-id.repository";
import { IFindControlsByProductIdRepository } from "@domain/repositories/find-control-by-product-id.repository";
import { IFindProductByIdRepository } from "@domain/repositories/find-product-by-id.repository";

describe("EXCLUSÃO DE PRODUTO DO ESTOQUE", () => {
  let controlList: ControlEntity[];
  let findProductById: IFindProductByIdRepository = {
      execute: jest.fn(),
    },
    findControlsByProductIdRepo: IFindControlsByProductIdRepository = {
      execute: jest.fn(),
    },
    deleteProductById: IDeleteProductByIdRepository = {
      execute: jest.fn(),
    };

  beforeEach(() => {
    controlList = [
      new ControlEntity({
        action: ControlActionEnum.INPUT,
        product: { id: 1 } as ProductEntity,
        createdAt: new Date(),
        updatedAt: new Date(),
        quantity: 10,
        id: 1,
      }),
      new ControlEntity({
        action: ControlActionEnum.INPUT,
        product: { id: 1 } as ProductEntity,
        createdAt: new Date(),
        updatedAt: new Date(),
        quantity: 20,
        id: 2,
      }),
      new ControlEntity({
        action: ControlActionEnum.OUTPUT,
        product: { id: 1 } as ProductEntity,
        createdAt: new Date(),
        updatedAt: new Date(),
        quantity: 20,
        id: 2,
      }),
    ];
  });
  it("Deve remover um produto que não possui controle de entradas - HAPPY END", () => {
    findProductById.execute = jest.fn().mockImplementation(() => {
      return { id: 1 } as ProductEntity;
    });
    findControlsByProductIdRepo.execute = jest.fn().mockReturnValue([]);
    deleteProductById.execute = jest.fn().mockReturnValue(1);

    const productRemove = new ProductRemoveUseCase(
      findProductById,
      findControlsByProductIdRepo,
      deleteProductById
    );

    const sut = productRemove.execute(1);
    expect(typeof sut).toBe("number");
    expect(sut).toBe(1);
    expect(findProductById.execute).toBeCalledTimes(1);
    expect(findControlsByProductIdRepo.execute).toBeCalledTimes(1);
    expect(deleteProductById.execute).toBeCalledTimes(1);
  });

  it("Não deve conseguir remover um produto se ele não existir", () => {
    findProductById.execute = jest.fn().mockReturnValue(null);
    findControlsByProductIdRepo.execute = jest.fn();
    deleteProductById.execute = jest.fn();

    const productRemove = new ProductRemoveUseCase(
      findProductById,
      findControlsByProductIdRepo,
      deleteProductById
    );
    try {
      const sut = productRemove.execute(1);
      expect(sut).toBeUndefined();
    } catch (error) {
      expect((error as ErrorProtocol).name).toBe("Product not found");
      expect((error as ErrorProtocol).message).toBe("Product not found");
      expect(findProductById.execute).toBeCalledTimes(1);
      expect(findControlsByProductIdRepo.execute).toBeCalledTimes(0);
      expect(deleteProductById.execute).toBeCalledTimes(0);
    }
  });

  it("Não deve conseguir remover um produto que possui registros de entradas e saídas", () => {
    findProductById.execute = jest.fn().mockImplementation(() => {
      return { id: 1 } as ProductEntity;
    });
    findControlsByProductIdRepo.execute = jest
      .fn()
      .mockReturnValue(controlList);
    deleteProductById.execute = jest.fn();

    const productRemove = new ProductRemoveUseCase(
      findProductById,
      findControlsByProductIdRepo,
      deleteProductById
    );
    try {
      const sut = productRemove.execute(1);
      expect(sut).toBeUndefined();
    } catch (error) {
      expect((error as ErrorProtocol).name).toBe(
        "Product has controls entries"
      );
      expect((error as ErrorProtocol).message).toBe(
        "Product has one or more control entries and cannot be deleted"
      );
      expect(findProductById.execute).toBeCalledTimes(1);
      expect(findControlsByProductIdRepo.execute).toBeCalledTimes(1);
      expect(deleteProductById.execute).toBeCalledTimes(0);
    }
  });
});
