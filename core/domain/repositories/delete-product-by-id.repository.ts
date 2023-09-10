export interface IDeleteProductByIdRepository {
  execute(productId: number): number;
}
