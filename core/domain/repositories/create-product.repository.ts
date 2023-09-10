export interface ICreateProductDTO {
  name?: string;
  description?: string;
  price?: number;
  stockLevel?: number;
  MinStockLevel?: number;
  providerId?: number;
}

export interface ICreateProductRepository {
  execute(createProductDTO: ICreateProductDTO): number;
}
