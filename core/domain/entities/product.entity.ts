import { ProviderEntity } from "./provider.entity";

export class ProductEntity {
  id: number;
  name: string;
  description: string;
  price: number;
  stockLevel: number;
  minStockLevel: number;
  provider: ProviderEntity;
}
