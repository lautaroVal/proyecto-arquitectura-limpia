import { describe, expect, vi, test } from "vitest";
import { RegisterUser } from "./register-user";
import { IUserRepo } from "../../repositories/IUserRepo";
import { IPasswordHasher } from "../../services/IPasswordHasher";
import { User } from "../../entities/user";

describe("RegisterUser", () => {
  test("should register a new user with hashed password", async () => {
    const mockRepo: IUserRepo = {
      findByEmail: vi.fn().mockResolvedValue(null),
      save: vi.fn().mockResolvedValue(undefined),
      findById: vi.fn()
    };

    const mockHasher: IPasswordHasher = {
      hash: vi.fn().mockResolvedValue("hashed-password"),
      compare: vi.fn()
    };

    const useCase = new RegisterUser(mockRepo, mockHasher);

    const result = await useCase.execute({
      name: "Lautaro",
      email: "lautaro@example.com",
      passwordHash: "123456",
    });

    expect(result.name).toBe("Lautaro");
    expect(result.email).toBe("lautaro@example.com");
    expect(result.passwordHash).toBe("hashed-password");
    expect(result.rol).toBe("CLIENT");
    expect(result.active).toBe(true);

    expect(mockRepo.findByEmail).toHaveBeenCalledWith("lautaro@example.com");
    expect(mockHasher.hash).toHaveBeenCalledWith("123456");
    expect(mockRepo.save).toHaveBeenCalledWith(result);
  });

  test("should throw error if email already exists", async () => {
    const existingUser: User = {
      id: "1",
      name: "Existing",
      email: "exist@example.com",
      passwordHash: "hash",
      rol: "CLIENT",
      active: true,
    };

    const mockRepo: IUserRepo = {
      findByEmail: vi.fn().mockResolvedValue(existingUser),
      save: vi.fn(),
      findById: vi.fn()
    };

    const mockHasher: IPasswordHasher = {
      hash: vi.fn(),
      compare: vi.fn()
    };

    const useCase = new RegisterUser(mockRepo, mockHasher);

    await expect(
      useCase.execute({
        name: "Lautaro",
        email: "exist@example.com",
        passwordHash: "123",
      })
    ).rejects.toThrow("Email already registered");
    expect(mockRepo.findByEmail).toHaveBeenCalledWith("exist@example.com");
  });
});
