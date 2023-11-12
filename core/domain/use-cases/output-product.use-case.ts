import { ControlEntity } from "../entities/control.entity";

export interface IOutputProductUseCase {
  execute(productId: number, quantity: number): ControlEntity;
}
