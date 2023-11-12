import { ControlEntity } from "@domain/entities/control.entity";
import { ControlActionEnum } from "@domain/entities/enum/control-action.enum";

export interface IManageControlDTO {
  productId: number;
  quantity: number;
  action: ControlActionEnum;
}

export interface IManageControlRepository {
  execute(manageControlDTO: IManageControlDTO): ControlEntity;
}
