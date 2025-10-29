import { IUserRepo, IOrderRepo, IProductRepo, IItemOrderRepo } from "../../repositories/index";
import { Order, orderState, ItemOrder, Product } from "../../entities/index";
import { v4 as uuidv4 } from "uuid";

interface CreateOrderDTO {
  clientId: string;
  items: { productId: string; quantity: number }[];
}

export class createOrder {
  constructor(
    private userRepo: IUserRepo,
    private productRepo: IProductRepo,
    private orderRepo: IOrderRepo,
    private itemOrderRepo: IItemOrderRepo
  ) { }

  async execute(data: CreateOrderDTO): Promise<Order> {
    const client = await this.userRepo.findById(data.clientId);
    if (!client || !client.active) {
      throw new Error("Invalid Customer.");
    }

    const itemsOrders: ItemOrder[] = [];
    let total = 0;

    for (const item of data.items) {
      const product: Product | null = await this.productRepo.getById(item.productId);
      if (!product || !product.available) {
        throw new Error(`Product unavailable: ${item.productId}`);
      }

      const subtotal = product.price * item.quantity;
      total += subtotal;

      itemsOrders.push({
        productId: product.id,
        name: product.name,
        quantity: item.quantity,
        unitPrice: product.price,
        subtotal,
      });
    }

    const order: Order = {
      id: uuidv4(),
      clientId: client.id,
      items: itemsOrders,
      total,
      state: orderState.PENDING,
      date: new Date()
    };

    await this.orderRepo.save(order);

    await this.itemOrderRepo.saveMany(itemsOrders, order.id);

    return order;
  }
}
