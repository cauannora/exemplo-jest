import { ControlEntity } from "@domain/entities/control.entity";

export interface IFindControlsByProductIdRepository {
  execute(productId: number): ControlEntity[];
}
