import { describe, test, expect, vi } from "vitest";
import { ListOrdersByUser } from "./list-orders-by-user";
import { IOrderRepo, IUserRepo } from "../../repositories/index";
import { Order } from "../../entities/index";

describe("ListOrdersByUser", () => {
  test("should return all orders for a given user", async () => {
    const mockUserRepo: IUserRepo = {
      findById: vi.fn().mockResolvedValue({ id: "user-1", name: "Lautaro", active: true }),
      findByEmail: vi.fn(),
      save: vi.fn()
    };

    const mockOrderRepo: IOrderRepo = {
      save: vi.fn(),
      update: vi.fn(),
      findById: vi.fn(),
      findByClientId: vi.fn().mockResolvedValue([
        { id: "order-1", clientId: "user-1", total: 200, items: [], state: "PENDING", date: new Date() },
        { id: "order-2", clientId: "user-1", total: 500, items: [], state: "READY", date: new Date() }
      ] as Order[])
    };

    const listOrdersByUser = new ListOrdersByUser(mockUserRepo, mockOrderRepo);

    const orders = await listOrdersByUser.execute({ userId: "user-1" });

    expect(orders).toHaveLength(2);
    expect(orders[0]!.clientId).toBe("user-1");
    expect(mockOrderRepo.findByClientId).toHaveBeenCalledWith("user-1");
  });

  test("should throw error if user does not exist", async () => {
    const mockUserRepo: IUserRepo = {
      findById: vi.fn().mockResolvedValue(null),
      findByEmail: vi.fn(),
      save: vi.fn()
    };

    const mockOrderRepo: IOrderRepo = {
      save: vi.fn(),
      update: vi.fn(),
      findById: vi.fn(),
      findByClientId: vi.fn()
    };

    const listOrdersByUser = new ListOrdersByUser(mockUserRepo, mockOrderRepo);

    await expect(
      listOrdersByUser.execute({ userId: "invalid-user" })
    ).rejects.toThrowError("User not found.");
  });
});
