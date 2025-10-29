import { ItemOrder } from "../entities/itemOrder";

export interface IItemOrderRepo {
  saveMany(items: ItemOrder[], orderId: string): Promise<void>;
}
