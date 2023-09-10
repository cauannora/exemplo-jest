import { ErrorProtocol } from "@domain/protocols/error.protocol";
import { ICreateProductRepository } from "@domain/repositories/create-product.repository";
import {
  IProductRegisterUseCase,
  IRegisterProductDTO,
} from "@domain/use-cases/product-register.use-case";

export class ProductRegisterUseCase implements IProductRegisterUseCase {
  constructor(private createProductRepository: ICreateProductRepository) {}

  execute(registerProductDTO: IRegisterProductDTO): number {
    if (!this.validProductProperties(registerProductDTO)) {
      throw new ErrorProtocol({
        name: "Invalid properties",
        message: "Product properties are invalid",
        metadata: registerProductDTO,
      });
    }

    if (
      registerProductDTO.stockLevel &&
      !this.validStockLevel(registerProductDTO.stockLevel)
    ) {
      throw new ErrorProtocol({
        name: "Invalid stock level",
        message: "Stock level must be greater than or equal to zero",
      });
    }

    const productId = this.createProductRepository.execute(registerProductDTO);

    return productId;
  }

  /**
   * Registro de produtos obrigatórios - RN002
   * @param registerProductDTO
   */
  private validProductProperties(
    registerProductDTO: IRegisterProductDTO
  ): boolean {
    if (!registerProductDTO.name) return false;
    if (!registerProductDTO.description) return false;
    if (!registerProductDTO.price) return false;
    if (!registerProductDTO.providerId) return false;
    if (!registerProductDTO.stockLevel) return false;

    return true;
  }

  /**
   * Quantidade de estoque não pode ser negativa - RN001
   * @param stockLevel
   */
  private validStockLevel(stockLevel: number): boolean {
    if (isNaN(stockLevel))
      throw new ErrorProtocol({
        name: "Invalid stock level",
        message: "Stock level is not a number",
      });

    return stockLevel >= 0;
  }
}
