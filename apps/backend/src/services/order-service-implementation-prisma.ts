import { prisma } from "../index.js";
import { IOrderRepo } from "../../../../domain/dist/repositories/IOrderRepo.js";
import { Order } from "../../../../domain/dist/entities/order.js";

export class OrderServiceImplementationPrisma implements IOrderRepo {

  async save(order: Order): Promise<void> {
    await prisma.order.create({
      data: {
        id: order.id,
        clientId: order.clientId,
        total: order.total,
        state: order.state,
        date: order.date,
      },
    });
  }

  async findById(id: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
    return order ? (order as Order) : null;
  }

  async findByClientId(clientId: string): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      where: { clientId },
      include: { items: true },
    });
    return orders as Order[];
  }

  async update(order: Order): Promise<void> {
    await prisma.order.update({
      where: { id: order.id },
      data: {
        total: order.total,
        state: order.state,
        date: order.date,
      },
    });
  }




  async listAll(): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      include: { items: true },
    });
    return orders as Order[];
  }
}
