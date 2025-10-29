import { describe, test, expect, vi } from "vitest";
import { AssignRole } from "./assign-role";
import { IUserRepo } from "../../repositories/index";
import { User } from "../../entities/index";

describe("AssignRole", () => {
    test("should assign new role when admin executes", async () => {
        const admin: User = {
            id: "admin-1",
            name: "Admin",
            email: "admin@test.com",
            passwordHash: "hashed",
            rol: "ADMIN",
            active: true,
        };

        const client: User = {
            id: "user-1",
            name: "Client",
            email: "client@test.com",
            passwordHash: "hashed",
            rol: "CLIENT",
            active: true,
        };

        const mockUserRepo: IUserRepo = {
            findById: vi.fn()
                .mockResolvedValueOnce(admin)
                .mockResolvedValueOnce(client),
            findByEmail: vi.fn(),
            save: vi.fn(),
        };

        const useCase = new AssignRole(mockUserRepo);

        await useCase.execute({
            adminId: "admin-1",
            userId: "user-1",
            newRole: "ADMIN",
        });

        expect(mockUserRepo.findById).toHaveBeenCalledTimes(2);
        expect(mockUserRepo.save).toHaveBeenCalledWith({
            ...client,
            rol: "ADMIN",
        });
    });

    test("should throw error if admin not found", async () => {
        const mockUserRepo: IUserRepo = {
            findById: vi.fn().mockResolvedValue(null),
            findByEmail: vi.fn(),
            save: vi.fn(),
        };

        const useCase = new AssignRole(mockUserRepo);

        await expect(
            useCase.execute({
                adminId: "not-exist",
                userId: "user-1",
                newRole: "ADMIN",
            })
        ).rejects.toThrowError("Unauthorized: only admins can assign roles");
    });

    test("should throw error if user not found", async () => {
        const admin: User = {
            id: "admin-1",
            name: "Admin",
            email: "admin@test.com",
            passwordHash: "hashed",
            rol: "ADMIN",
            active: true,
        };

        const mockUserRepo: IUserRepo = {
            findById: vi.fn()
                .mockResolvedValueOnce(admin)
                .mockResolvedValueOnce(null),
            findByEmail: vi.fn(),
            save: vi.fn(),
        };

        const useCase = new AssignRole(mockUserRepo);

        await expect(
            useCase.execute({
                adminId: "admin-1",
                userId: "no-user",
                newRole: "ADMIN",
            })
        ).rejects.toThrowError("User not found");
        expect(mockUserRepo.findById).toHaveBeenCalledWith("no-user")
    });

    test("should throw error if requester is not admin", async () => {
        const client: User = {
            id: "user-1",
            name: "Client",
            email: "client@test.com",
            passwordHash: "hashed",
            rol: "CLIENT",
            active: true,
        };

        const mockUserRepo: IUserRepo = {
            findById: vi.fn().mockResolvedValue(client),
            findByEmail: vi.fn(),
            save: vi.fn(),
        };

        const useCase = new AssignRole(mockUserRepo);

        await expect(
            useCase.execute({
                adminId: "user-1",
                userId: "user-2",
                newRole: "ADMIN",
            })
        ).rejects.toThrowError("Unauthorized: only admins can assign roles");
    });
});
