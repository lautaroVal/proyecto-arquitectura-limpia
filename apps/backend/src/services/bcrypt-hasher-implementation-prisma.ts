import bcrypt from "bcryptjs";
import { IPasswordHasher } from "../../../../domain/dist/services/IPasswordHasher.js";

export class BcryptHasher implements IPasswordHasher {
    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
    async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
