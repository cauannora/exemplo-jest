import { ControlEntity } from "@domain/models/control.entity";
import { ControlActionEnum } from "@domain/models/enum/control-action.enum";
import { ErrorProtocol } from "@domain/protocols/error.protocol";
import { IFindProductByIdRepository } from "@domain/repositories/find-product-by-id.repository";
import { IManageControlRepository } from "@domain/repositories/manage-control.repository";
import { IUpdateProductRepository } from "@domain/repositories/update-product.repository";
import { IInputProductUseCase } from "@domain/use-cases/input-product.use-case";

export class InputProductUseCase implements IInputProductUseCase {
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

    const control: ControlEntity = this.manageControlRepo.execute({
      productId: product.id,
      quantity,
      action: ControlActionEnum.INPUT,
    });

    const updatedProduct = this.updateProductRepo.execute(productId, {
      stockLevel: product.stockLevel + quantity,
    });

    control.product = updatedProduct;

    return control;
  }
}
