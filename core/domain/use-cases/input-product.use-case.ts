import { ControlEntity } from "../entities/control.entity";

export interface IInputProductUseCase {
  execute(productId: number, quantity: number): ControlEntity;
}
