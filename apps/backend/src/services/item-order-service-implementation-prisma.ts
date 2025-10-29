import { prisma } from "../index.js";
import { IItemOrderRepo } from "../../../../domain/dist/repositories/IItemOrderRepo.js";
import { ItemOrder } from "../../../../domain/dist/entities/itemOrder.js";

export class ItemOrderServiceImplementationPrisma implements IItemOrderRepo {
    async saveMany(items: ItemOrder[], orderId: string): Promise<void> {
        await prisma.itemOrder.createMany({
            data: items.map((item) => ({
                orderId,
                productId: item.productId,
                name: item.name,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                subtotal: item.subtotal,
            })),
        });
    }
}
