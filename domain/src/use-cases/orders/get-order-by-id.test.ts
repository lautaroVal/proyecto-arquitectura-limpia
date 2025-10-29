import { describe, test, expect, vi } from "vitest";
import { GetOrderById } from "./get-order-by-id";
import { IOrderRepo, IUserRepo } from "../../repositories/index";
import { Order } from "../../entities/index";

describe("GetOrderById", () => {
  test("should return the order if user is the owner", async () => {
    const mockOrder: Order = {
      id: "order-1",
      clientId: "user-1",
      total: 700,
      items: [],
      state: "PENDING",
      date: new Date()
    };

    const mockUserRepo: IUserRepo = {
      findById: vi.fn().mockResolvedValue({ id: "user-1", name: "Lautaro", rol: "CLIENT", active: true }),
      findByEmail: vi.fn(),
      save: vi.fn()
    };

    const mockOrderRepo: IOrderRepo = {
      findById: vi.fn().mockResolvedValue(mockOrder),
      save: vi.fn(),
      update: vi.fn(),
      findByClientId: vi.fn()
    };

    const getOrderById = new GetOrderById(mockOrderRepo, mockUserRepo);

    const order = await getOrderById.execute({ orderId: "order-1", requesterId: "user-1" });

    expect(order).toBe(mockOrder);
    expect(mockOrderRepo.findById).toHaveBeenCalledWith("order-1");
  });

  test("should return the order if requester is admin", async () => {
    const mockOrder: Order = {
      id: "order-2",
      clientId: "user-2",
      total: 1000,
      items: [],
      state: "READY",
      date: new Date()
    };

    const mockUserRepo: IUserRepo = {
      findById: vi.fn().mockResolvedValue({ id: "admin-1", name: "Admin", rol: "ADMIN", active: true }),
      findByEmail: vi.fn(),
      save: vi.fn()
    };

    const mockOrderRepo: IOrderRepo = {
      findById: vi.fn().mockResolvedValue(mockOrder),
      save: vi.fn(),
      update: vi.fn(),
      findByClientId: vi.fn()
    };

    const getOrderById = new GetOrderById(mockOrderRepo, mockUserRepo);

    const order = await getOrderById.execute({ orderId: "order-2", requesterId: "admin-1" });

    expect(order.id).toBe("order-2");
    expect(order.total).toBe(1000);
    expect(order.items).toHaveLength(0)
  });

  test("should throw error if user not found", async () => {
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

    const getOrderById = new GetOrderById(mockOrderRepo, mockUserRepo);

    await expect(
      getOrderById.execute({ orderId: "order-1", requesterId: "no-user" })
    ).rejects.toThrowError("User not found.");
  });

  test("should throw error if order not found", async () => {
    const mockUserRepo: IUserRepo = {
      findById: vi.fn().mockResolvedValue({ id: "user-1", name: "Lautaro", rol: "CLIENT", active: true }),
      findByEmail: vi.fn(),
      save: vi.fn()
    };

    const mockOrderRepo: IOrderRepo = {
      findById: vi.fn().mockResolvedValue(null),
      save: vi.fn(),
      update: vi.fn(),
      findByClientId: vi.fn()
    };

    const getOrderById = new GetOrderById(mockOrderRepo, mockUserRepo);

    await expect(
      getOrderById.execute({ orderId: "not-exist", requesterId: "user-1" })
    ).rejects.toThrowError("Order not found.");
  });

  test("should throw error if user tries to access someone else's order", async () => {
    const mockOrder: Order = {
      id: "order-1",
      clientId: "user-2",
      total: 300,
      items: [],
      state: "PENDING",
      date: new Date()
    };

    const mockUserRepo: IUserRepo = {
      findById: vi.fn().mockResolvedValue({ id: "user-1", name: "Lautaro", rol: "CLIENT", active: true }),
      findByEmail: vi.fn(),
      save: vi.fn()
    };

    const mockOrderRepo: IOrderRepo = {
      findById: vi.fn().mockResolvedValue(mockOrder),
      save: vi.fn(),
      update: vi.fn(),
      findByClientId: vi.fn()
    };

    const getOrderById = new GetOrderById(mockOrderRepo, mockUserRepo);

    await expect(
      getOrderById.execute({ orderId: "order-1", requesterId: "user-1" })
    ).rejects.toThrowError("Access denied. You don't have permission to view this order.");
  });
});
