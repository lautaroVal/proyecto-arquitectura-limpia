import { Order } from "../entities/order";

export interface IOrderRepo {
  
  save(order: Order): Promise<void>;

  findById(id: string): Promise<Order | null>;

  findByClientId(clientId: string): Promise<Order[]>;

  update(order: Order): Promise<void>;


  listAll?(): Promise<Order[]>;
}
