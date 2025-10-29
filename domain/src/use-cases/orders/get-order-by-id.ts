import { IOrderRepo, IUserRepo } from "../../repositories/index";
import { Order } from "../../entities/order";

interface getOrderByIdDTO {
    orderId: string,
    requesterId: string,
}

export class GetOrderById {
    constructor(
        private orderRepo: IOrderRepo,
        private userRepo: IUserRepo,
    ) { }

    async execute(data: getOrderByIdDTO): Promise<Order> {
        const user = await this.userRepo.findById(data.requesterId);
        if (!user) {
            throw new Error("User not found.");
        }
        const order = await this.orderRepo.findById(data.orderId);
        if (!order) {
            throw new Error("Order not found.")
        }

        const isOwner = order.clientId === user.id;
        const isAdmin = user.rol === "ADMIN";

        if (!isOwner && !isAdmin) {
            throw new Error("Access denied. You don't have permission to view this order.")
        }

        return order
    }
}