import { ControlEntity } from "../models/control.entity";

export interface IInputProductUseCase {
  execute(productId: number, quantity: number): ControlEntity;
}
