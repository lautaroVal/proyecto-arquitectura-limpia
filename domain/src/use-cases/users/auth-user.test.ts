import { describe, expect, vi, test } from "vitest";
import { AuthUser } from "./auth-user";
import { IUserRepo } from "../../repositories/IUserRepo";
import { IPasswordHasher } from "../../services/IPasswordHasher";
import { User } from "../../entities/user"
import { faker } from "@faker-js/faker";

describe("AuthUser", () => {
  const fakeUser: User = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    passwordHash: "hashed-password",
    rol: "CLIENT",
    active: true
  };

  const mockRepo: IUserRepo = {
    findByEmail: vi.fn(),
    save: vi.fn(),
    findById: vi.fn(),
  };

  const mockHasher: IPasswordHasher = {
    hash: vi.fn(),
    compare: vi.fn(),
  };

  test("should authenticate user successfully", async () => {
    mockRepo.findByEmail = vi.fn().mockResolvedValue(fakeUser);
    mockHasher.compare = vi.fn().mockResolvedValue(true);

    const useCase = new AuthUser(mockRepo, mockHasher);

    const result = await useCase.execute({
      email: fakeUser.email,
      password: "plain-password",
    });

    expect(result).toBe(fakeUser);
    expect(mockRepo.findByEmail).toHaveBeenCalledWith(fakeUser.email);
    expect(mockHasher.compare).toHaveBeenCalledWith(
      "plain-password",
      fakeUser.passwordHash
    );
  });

  test("should throw error if user not found", async () => {
    mockRepo.findByEmail = vi.fn().mockResolvedValue(null);

    const useCase = new AuthUser(mockRepo, mockHasher);

    await expect(
      useCase.execute({
        email: faker.internet.email(),
        password: "some-password",
      })
    ).rejects.toThrow("User not found");
  });

  test("should throw error if password is invalid", async () => {
    mockRepo.findByEmail = vi.fn().mockResolvedValue(fakeUser);
    mockHasher.compare = vi.fn().mockResolvedValue(false);

    const useCase = new AuthUser(mockRepo, mockHasher);

    await expect(
      useCase.execute({
        email: fakeUser.email,
        password: "wrong-password",
      })
    ).rejects.toThrow("Invalid credentials");
  });
});
