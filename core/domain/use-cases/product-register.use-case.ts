export interface IRegisterProductDTO {
  name?: string;
  description?: string;
  price?: number;
  stockLevel?: number;
  MinStockLevel?: number;
  providerId?: number;
}

export interface IProductRegisterUseCase {
  execute(registerProductDTO: IRegisterProductDTO): number;
}
