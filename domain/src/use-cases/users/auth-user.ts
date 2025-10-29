import { IUserRepo } from "../../repositories/IUserRepo";
import { IPasswordHasher } from "../../services/IPasswordHasher";
import { User } from "../../entities/user";

export interface AuthUserTO {
  email: string;
  password: string;
}

export class AuthUser {
  constructor(
    private readonly userRepo: IUserRepo,
    private readonly hasher: IPasswordHasher
  ) { }

  async execute(request: AuthUserTO): Promise<User> {
    const user = await this.userRepo.findByEmail(request.email);
    if (!user) throw new Error("User not found");

    const isValid = await this.hasher.compare(request.password, user.passwordHash);
    if (!isValid) throw new Error("Invalid credentials");

    return user;
  }
}
