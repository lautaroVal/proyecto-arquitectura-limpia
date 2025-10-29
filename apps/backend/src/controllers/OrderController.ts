import { Request, Response } from "express";
import { OrderServiceImplementationPrisma } from "../services/order-service-implementation-prisma.js";
import { ProductServiceImplementationPrisma } from "../services/product-service-implementation-prisma.js";
import { UserServiceImplementationPrisma } from "../services/user-service-implementation-prisma.js";
import { ItemOrderServiceImplementationPrisma } from "../services/item-order-service-implementation-prisma.js";
import { createOrder } from "../../../../domain/dist/use-cases/orders/create-order.js";
import { GetOrderById } from "../../../../domain/dist/use-cases/orders/get-order-by-id.js";
import { ListOrdersByUser } from "../../../../domain/dist/use-cases/orders/list-orders-by-user.js";
import { ChangeOrderStatus } from "../../../../domain/dist/use-cases/orders/change-order-status.js";

export class OrderController {
    private userService = new UserServiceImplementationPrisma();
    private productService = new ProductServiceImplementationPrisma();
    private orderService = new OrderServiceImplementationPrisma();
    private itemOrderService = new ItemOrderServiceImplementationPrisma();

    CreateOrder = async (req: Request, res: Response) => {
        try {
            const orderData = req.body;
            const useCase = new createOrder(
                this.userService,
                this.productService,
                this.orderService,
                this.itemOrderService
            );
            const order = await useCase.execute(orderData);

            return res.status(201).json(order);
        } catch (error: any) {
            console.error(error);
            return res.status(400).json({ message: error.message });
        }
    };

    GetOrderById = async (req: Request, res: Response) => {
        try {
            const { orderId, requesterId } = req.body;
            const useCase = new GetOrderById(
                this.orderService,
                this.userService
            );
            const order = await useCase.execute({ orderId, requesterId });

            return res.status(200).json(order);
        } catch (error: any) {
            console.error(error);
            return res.status(400).json({ message: error.message });
        }
    };

    ListOrdersByUser = async (req: Request, res: Response) => {
        try {
            const { userId } = req.body;
            const useCase = new ListOrdersByUser(
                this.userService,
                this.orderService
            );
            const orders = await useCase.execute({ userId });

            return res.status(200).json(orders);
        } catch (error: any) {
            console.error(error);
            return res.status(400).json({ message: error.message });
        }
    };

    ChangeOrderStatus = async (req: Request, res: Response) => {
        try {
            const { orderId, adminId, newState } = req.body;
            const useCase = new ChangeOrderStatus(
                this.orderService,
                this.userService
            );
            const updatedOrder = await useCase.execute({ orderId, adminId, newState });

            return res.status(200).json(updatedOrder);
        } catch (error: any) {
            console.error(error);
            return res.status(400).json({ message: error.message });
        }
    };
}
