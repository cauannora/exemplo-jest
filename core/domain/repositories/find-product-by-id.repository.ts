import { ProductEntity } from "@domain/models/product.entity";

export interface IFindProductByIdRepository {
  execute(productId: number): ProductEntity;
}
