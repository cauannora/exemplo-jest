import { ProductEntity } from "@domain/models/product.entity";

export interface IUpdateProductDTO {
  name?: string;
  description?: string;
  price?: number;
  stockLevel?: number;
  minStockLevel?: number;
}

export interface IUpdateProductRepository {
  execute(
    productId: number,
    updateProductDTO: IUpdateProductDTO
  ): ProductEntity;
}
