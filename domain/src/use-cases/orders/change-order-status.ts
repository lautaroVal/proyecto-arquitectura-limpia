import { IOrderRepo, IUserRepo } from "../../repositories/index";
import { orderState, Order } from "../../entities";

interface ChangeOrderStatusDTO {
  orderId: string;
  adminId: string;
  newState: orderState;
}

export class ChangeOrderStatus {
  constructor(
    private orderRepo: IOrderRepo,
    private userRepo: IUserRepo
  ) { }

  async execute(data: ChangeOrderStatusDTO): Promise<Order> {
    const admin = await this.userRepo.findById(data.adminId);
    if (!admin || admin.rol !== "ADMIN" || !admin.active) {
      throw new Error("Unauthorized: only active ADMINs can change order status.");
    }

    const order = await this.orderRepo.findById(data.orderId);
    if (!order) {
      throw new Error("Order not found.");
    }

    const validTransitions: Record<orderState, orderState[]> = {
      PENDING: ["INPREPARATION", "CANCELED"],
      INPREPARATION: ["READY", "CANCELED"],
      READY: ["DELIVERED", "CANCELED"],
      DELIVERED: [],
      CANCELED: []
    };

    if (!validTransitions[order.state].includes(data.newState)) {
      throw new Error(`Invalid state transition from ${order.state} to ${data.newState}.`);
    }

    order.state = data.newState;
    await this.orderRepo.update(order);

    return order;
  }
}
