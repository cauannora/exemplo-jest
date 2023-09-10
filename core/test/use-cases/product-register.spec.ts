import { ProductRegisterUseCase } from "@application/use-cases/product-register.use-case";
import { ErrorProtocol } from "@domain/protocols/error.protocol";
import { ICreateProductRepository } from "@domain/repositories/create-product.repository";
import { IRegisterProductDTO } from "@domain/use-cases/product-register.use-case";

describe("REGISTRO DE PRODUTOS", () => {
  let product: IRegisterProductDTO;
  let createProductRepo: ICreateProductRepository;

  beforeEach(() => {
    createProductRepo = {
      execute: jest.fn().mockReturnValue(1),
    };
    product = {
      description: "Product description",
      name: "Product name",
      price: 10,
      MinStockLevel: 1,
      stockLevel: 10,
      providerId: 1,
    };
  });

  it("Deve registrar um produto - HAPPY END", () => {
    const sut = new ProductRegisterUseCase(createProductRepo);
    try {
      const result = sut.execute(product);
      expect(result).toBe(1);
    } catch (error) {
      expect(error).not.toBeInstanceOf(ErrorProtocol);
    }
  });

  it("Deve falhar ao tentar criar produto com estoque negativo", () => {
    product.stockLevel = -1;
    const sut = new ProductRegisterUseCase(createProductRepo);
    try {
      sut.execute(product);
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorProtocol);
      expect((error as ErrorProtocol).name).toBe("Invalid stock level");
      expect((error as ErrorProtocol).message).toBe(
        "Stock level must be greater than or equal to zero"
      );
      expect(createProductRepo.execute).toBeCalledTimes(0);
    }
  });

  it("Deve falhar ao tentar criar produto passando valor diferente de numero no estoque", () => {
    product["stockLevel"] = "10" as unknown as number;
    const sut = new ProductRegisterUseCase(createProductRepo);
    try {
      sut.execute(product);
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorProtocol);
      expect((error as ErrorProtocol).name).toBe("Invalid stock level");
      expect((error as ErrorProtocol).message).toBe(
        "Stock level is not a number"
      );
      expect(createProductRepo.execute).toBeCalledTimes(0);
    }
  });

  it("Deve falhar ao tentar criar produto com parâmetros invalido (stockLevel)", () => {
    product.stockLevel = "10" as unknown as number;
    const sut = new ProductRegisterUseCase(createProductRepo);
    try {
      sut.execute(product);
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorProtocol);
      expect((error as ErrorProtocol).name).toBe("Invalid stock level");
      expect((error as ErrorProtocol).message).toBe(
        "Stock level is not a number"
      );
      expect(createProductRepo.execute).toBeCalledTimes(0);
    }
  });

  it("Deve falhar ao tentar criar produto com parâmetros faltando (name)", () => {
    delete product.name;
    const sut = new ProductRegisterUseCase(createProductRepo);
    try {
      sut.execute(product);
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorProtocol);
      expect((error as ErrorProtocol).name).toBe("Invalid properties");
      expect((error as ErrorProtocol).message).toBe(
        "Product properties are invalid"
      );
      expect(createProductRepo.execute).toBeCalledTimes(0);
    }
  });

  it("Deve falhar ao tentar criar produto com parâmetros faltando (description)", () => {
    delete product.description;
    const sut = new ProductRegisterUseCase(createProductRepo);
    try {
      sut.execute(product);
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorProtocol);
      expect((error as ErrorProtocol).name).toBe("Invalid properties");
      expect((error as ErrorProtocol).message).toBe(
        "Product properties are invalid"
      );
      expect(createProductRepo.execute).toBeCalledTimes(0);
    }
  });

  it("Deve falhar ao tentar criar produto com parâmetros faltando (price)", () => {
    delete product.price;
    const sut = new ProductRegisterUseCase(createProductRepo);
    try {
      sut.execute(product);
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorProtocol);
      expect((error as ErrorProtocol).name).toBe("Invalid properties");
      expect((error as ErrorProtocol).message).toBe(
        "Product properties are invalid"
      );
      expect(createProductRepo.execute).toBeCalledTimes(0);
    }
  });

  it("Deve falhar ao tentar criar produto com parâmetros faltando (providerId)", () => {
    delete product.providerId;
    const sut = new ProductRegisterUseCase(createProductRepo);
    try {
      sut.execute(product);
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorProtocol);
      expect((error as ErrorProtocol).name).toBe("Invalid properties");
      expect((error as ErrorProtocol).message).toBe(
        "Product properties are invalid"
      );
      expect(createProductRepo.execute).toBeCalledTimes(0);
    }
  });

  it("Deve falhar ao tentar criar produto com parâmetros faltando (stockLevel)", () => {
    delete product.stockLevel;
    const sut = new ProductRegisterUseCase(createProductRepo);
    try {
      sut.execute(product);
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorProtocol);
      expect((error as ErrorProtocol).name).toBe("Invalid properties");
      expect((error as ErrorProtocol).message).toBe(
        "Product properties are invalid"
      );
      expect(createProductRepo.execute).toBeCalledTimes(0);
    }
  });

  it("Deve falhar ao tentar criar produto com parâmetros faltando (MinStockLevel)", () => {
    delete product.MinStockLevel;
    const sut = new ProductRegisterUseCase(createProductRepo);
    try {
      sut.execute(product);
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorProtocol);
      expect((error as ErrorProtocol).name).toBe("Invalid properties");
      expect((error as ErrorProtocol).message).toBe(
        "Product properties are invalid"
      );
      expect(createProductRepo.execute).toBeCalledTimes(0);
    }
  });
});
