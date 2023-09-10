import { ErrorProtocol } from "@domain/protocols/error.protocol";
import { IDeleteProductByIdRepository } from "@domain/repositories/delete-product-by-id.repository";
import { IFindControlsByProductIdRepository } from "@domain/repositories/find-control-by-product-id.repository";
import { IFindProductByIdRepository } from "@domain/repositories/find-product-by-id.repository";
import { IProductRemoveUseCase } from "@domain/use-cases/product-remove.use-case";

export class ProductRemoveUseCase implements IProductRemoveUseCase {
  constructor(
    private findProductById: IFindProductByIdRepository,
    private findControlsByProductIdRepo: IFindControlsByProductIdRepository,
    private deleteProductById: IDeleteProductByIdRepository
  ) {}
  execute(productId: number): number {
    const product = this.findProductById.execute(productId);

    if (!product) {
      throw new ErrorProtocol({
        name: "Product not found",
        message: "Product not found",
      });
    }

    const controlList = this.findControlsByProductIdRepo.execute(productId);
    if (controlList.length > 0) {
      throw new ErrorProtocol({
        name: "Product has controls entries",
        message:
          "Product has one or more control entries and cannot be deleted",
      });
    }

    const deletedResult = this.deleteProductById.execute(productId);

    return deletedResult;
  }
}
