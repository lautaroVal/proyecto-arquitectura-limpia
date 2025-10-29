import { describe, expect, test, vi } from "vitest";
import { ChangeOrderStatus } from "./change-order-status";
import { IUserRepo, IOrderRepo } from "../../repositories";
import { Order, orderState } from "../../entities";

describe("ChangeOrderStatus", () => {
  test("should change the status of an order if the user is ADMIN", async () => {
    const mockUserRepo: IUserRepo = {
      findByEmail: vi.fn(),
      findById: vi.fn().mockResolvedValue({
        id: "admin1",
        name: "Administrator",
        email: "admin@test.com",
        passwordHash: "",
        rol: "ADMIN",
        active: true,
      }),
      save: vi.fn(),
    };

    const mockOrderRepo: IOrderRepo = {
      findById: vi.fn().mockResolvedValue({
        id: "order1",
        clientId: "u1",
        items: [],
        total: 0,
        state: orderState.PENDING,
        date: new Date(),
      }),
      findByClientId: vi.fn(),
      save: vi.fn(),
      update: vi.fn().mockResolvedValue(undefined),
    };

    const useCase = new ChangeOrderStatus(mockOrderRepo, mockUserRepo);

    const updatedOrder = await useCase.execute({
      orderId: "order1",
      adminId: "admin1",
      newState: orderState.INPREPARATION,
    });

    expect(updatedOrder.state).toBe(orderState.INPREPARATION);
    expect(mockOrderRepo.update).toHaveBeenCalledWith(updatedOrder);
  });

  test("should throw an error if the user is not ADMIN", async () => {
    const mockUserRepo: IUserRepo = {
      findById: vi.fn().mockResolvedValue({
        id: "u1",
        name: "Client",
        email: "c@test.com",
        passwordHash: "",
        rol: "CLIENT",
        active: true,
      }),
      findByEmail: vi.fn(),
      save: vi.fn(),
    };

    const mockOrderRepo: IOrderRepo = {
      findById: vi.fn().mockResolvedValue({
        id: "order1",
        clientId: "u1",
        items: [],
        total: 0,
        state: orderState.PENDING,
        date: new Date(),
      }),
      findByClientId: vi.fn(),
      save: vi.fn(),
      update: vi.fn(),
    };

    const useCase = new ChangeOrderStatus(mockOrderRepo, mockUserRepo);

    await expect(
      useCase.execute({
        orderId: "order1",
        adminId: "u1",
        newState: orderState.INPREPARATION,
      })
    ).rejects.toThrow("Unauthorized: only active ADMINs can change order status.");
  });

  test("should throw an error if the state transition is invalid", async () => {
    const mockUserRepo: IUserRepo = {
      findById: vi.fn().mockResolvedValue({
        id: "admin1",
        name: "Administrator",
        email: "admin@test.com",
        passwordHash: "",
        rol: "ADMIN",
        active: true,
      }),
      findByEmail: vi.fn(),
      save: vi.fn(),
    };

    const mockOrderRepo: IOrderRepo = {
      findById: vi.fn().mockResolvedValue({
        id: "order1",
        clientId: "u1",
        items: [],
        total: 0,
        state: orderState.DELIVERED,
        date: new Date(),
      }),
      findByClientId: vi.fn(),
      save: vi.fn(),
      update: vi.fn(),
    };

    const useCase = new ChangeOrderStatus(mockOrderRepo, mockUserRepo);

    await expect(
      useCase.execute({
        orderId: "order1",
        adminId: "admin1",
        newState: orderState.CANCELED,
      })
    ).rejects.toThrow("Invalid state transition from DELIVERED to CANCELED.");
  });
});
