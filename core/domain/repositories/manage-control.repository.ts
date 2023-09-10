import { ControlEntity } from "@domain/models/control.entity";
import { ControlActionEnum } from "@domain/models/enum/control-action.enum";

export interface IManageControlDTO {
  productId: number;
  quantity: number;
  action: ControlActionEnum;
}

export interface IManageControlRepository {
  execute(manageControlDTO: IManageControlDTO): ControlEntity;
}
