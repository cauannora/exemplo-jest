import { ProductEntity } from "@domain/entities/product.entity";

export interface IFindProductByIdRepository {
  execute(productId: number): ProductEntity;
}
