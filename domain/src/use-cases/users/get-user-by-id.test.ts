import { describe, test, expect, vi } from "vitest";
import { GetUserById } from "./get-user-by-id";
import { IUserRepo } from "../../repositories/index";
import { User } from "../../entities/index";

describe("GetUserById", () => {
  test("should return user when found", async () => {
    const mockUser: User = {
      id: "u1",
      name: "Lautaro",
      email: "lautaro@test.com",
      passwordHash: "hashed123",
      rol: "CLIENT",
      active: true,
    };

    const mockUserRepo: IUserRepo = {
      findById: vi.fn().mockResolvedValue(mockUser),
      findByEmail: vi.fn(),
      save: vi.fn(),
    };

    const useCase = new GetUserById(mockUserRepo);
    const user = await useCase.execute("u1");

    expect(user).toBe(mockUser);
    expect(mockUserRepo.findById).toHaveBeenCalledWith("u1");
  });

  test("should throw error if user not found", async () => {
    const mockUserRepo: IUserRepo = {
      findById: vi.fn().mockResolvedValue(null),
      findByEmail: vi.fn(),
      save: vi.fn(),
    };

    const useCase = new GetUserById(mockUserRepo);

    await expect(useCase.execute("not-exist")).rejects.toThrowError("User not found");
  });
});
