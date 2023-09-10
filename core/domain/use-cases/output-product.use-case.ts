import { ControlEntity } from "../models/control.entity";

export interface IOutputProductUseCase {
  execute(productId: number, quantity: number): ControlEntity;
}
