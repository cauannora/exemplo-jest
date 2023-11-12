import { ControlEntity } from "@domain/entities/control.entity";
import { ControlActionEnum } from "@domain/entities/enum/control-action.enum";
import { ErrorProtocol } from "@domain/protocols/error.protocol";
import { IFindProductByIdRepository } from "@domain/repositories/find-product-by-id.repository";
import { IManageControlRepository } from "@domain/repositories/manage-control.repository";
import { IUpdateProductRepository } from "@domain/repositories/update-product.repository";
import { IOutputProductUseCase } from "@domain/use-cases/output-product.use-case";

export class OutputProductUseCase implements IOutputProductUseCase {
  constructor(
    private manageControlRepo: IManageControlRepository,
    private findProductByIdRepo: IFindProductByIdRepository,
    private updateProductRepo: IUpdateProductRepository
  ) {}

  execute(productId: number, quantity: number): ControlEntity {
    const product = this.findProductByIdRepo.execute(productId);
    if (!product) {
      throw new ErrorProtocol({
        name: "Product not found",
        message: "Product not found",
      });
    }

    if (product.stockLevel > quantity && product.stockLevel < 0) {
      throw new ErrorProtocol({
        name: "Insufficient stock level",
        message: "Stock level is insufficient to register output product",
      });
    }

    const control: ControlEntity = this.manageControlRepo.execute({
      productId: product.id,
      quantity,
      action: ControlActionEnum.INPUT,
    });

    const updatedProduct = this.updateProductRepo.execute(productId, {
      stockLevel: product.stockLevel - quantity,
    });

    control.product = updatedProduct;

    return control;
  }
}
