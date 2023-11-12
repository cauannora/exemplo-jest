import { ControlActionEnum } from "./enum/control-action.enum";
import { ProductEntity } from "./product.entity";

export class ControlEntity {
  id: number;
  action: ControlActionEnum;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  product: ProductEntity;

  constructor(props: ControlEntity) {
    Object.assign(this, props);
  }
}
