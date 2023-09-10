import { ControlEntity } from "@domain/models/control.entity";

export interface IFindControlsByProductIdRepository {
  execute(productId: number): ControlEntity[];
}
