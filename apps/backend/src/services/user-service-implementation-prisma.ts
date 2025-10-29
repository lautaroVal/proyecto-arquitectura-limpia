import { prisma } from "../index.js";
import { IUserRepo } from "../../../../domain/dist/repositories/IUserRepo.js";
import { User } from "../../../../domain/dist/entities/user.js";

export class UserServiceImplementationPrisma implements IUserRepo {
    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { email } });
    }
    async findById(id: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { id } })
    }
    async save(user: User): Promise<void> {
        await prisma.user.create({ data: user });
    }
}
