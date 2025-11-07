import { describe, test, expect, beforeEach } from "vitest";
import { createOrder } from "./create-order";
import { IUserRepo, IOrderRepo, IProductRepo, IItemOrderRepo } from "../../repositories/index";
import { Order, User, Product, ItemOrder } from "../../entities/index";

class UserRepoMock implements IUserRepo {
  private users: User[] = [
    { id: "u1", name: "Client 1", email: "c1@test.com", passwordHash: "", rol: "CLIENT", active: true },
  ];
  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(u => u.email === email) || null;
  }
  async findById(id: string): Promise<User | null> {
    return this.users.find(u => u.id === id) || null;
  }
  async save(user: User): Promise<void> { }
}

class ProductRepoMock implements IProductRepo {
  private products: Product[] = [
    { id: "p1", name: "Hamburguer", price: 500, available: true, type: "BURGER",image: "imge.jpg" },
    { id: "p2", name: "Fries", price: 200, available: true, type: "ACOMPANIMENT",image: "image.jpg" },
  ];
  async getById(id: string) {
    return this.products.find(p => p.id === id) || null;
  }
  async delete(id: string): Promise<void> { }
  async findAll(): Promise<Product[]> { return this.products }
  async save(product: Product): Promise<void> { }
  async update(id: string, data: Partial<Omit<Product, "id">>): Promise<void> { }
}

class OrderRepoMock implements IOrderRepo {
  public orders: Order[] = [];
  async save(order: Order) { this.orders.push(order) }
  async findByClientId(clientId: string): Promise<Order[]> { return this.orders }
  async findById(id: string): Promise<Order | null> { return null }
  async update(order: Order): Promise<void> { }
}

class ItemOrderRepoMock implements IItemOrderRepo {
  public savedItems: { orderId: string; items: ItemOrder[] }[] = [];

  async saveMany(items: ItemOrder[], orderId: string): Promise<void> {
    this.savedItems.push({ orderId, items });
  }
}

describe("CreateOrder", () => {
  let CreateOrder: createOrder;
  let userRepo: UserRepoMock;
  let productRepo: ProductRepoMock;
  let orderRepo: OrderRepoMock;
  let itemOrderRepo: ItemOrderRepoMock;

  beforeEach(() => {
    userRepo = new UserRepoMock();
    productRepo = new ProductRepoMock();
    orderRepo = new OrderRepoMock();
    itemOrderRepo = new ItemOrderRepoMock();

    CreateOrder = new createOrder(userRepo, productRepo, orderRepo, itemOrderRepo);
  });

  test("should create an order correctly", async () => {
    const order = await CreateOrder.execute({
      clientId: "u1",
      items: [
        { productId: "p1", quantity: 2 },
        { productId: "p2", quantity: 1 },
      ],
    });
    expect(order.clientId).toBe("u1");
    expect(order.items.length).toBe(2);
    expect(order.total).toBe(500 * 2 + 200 * 1);
    expect(order.state).toBe("PENDING");
    expect(orderRepo.orders.length).toBe(1);
  });

  test("should fail if the customer does not exist", async () => {
    await expect(CreateOrder.execute({
      clientId: "u999",
      items: [{ productId: "p1", quantity: 1 }],
    })).rejects.toThrow("Invalid Customer.");
  });

  test("should fail if a product is unavailable", async () => {
    await expect(CreateOrder.execute({
      clientId: "u1",
      items: [{ productId: "p999", quantity: 1 }],
    })).rejects.toThrow("Product unavailable: p999");
  });
});
