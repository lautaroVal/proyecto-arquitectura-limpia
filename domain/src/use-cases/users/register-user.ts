import { IUserRepo } from "../../repositories/IUserRepo";
import { IPasswordHasher } from "../../services/IPasswordHasher";
import { User, userRol } from "../../entities/user";
import { v4 as uuidv4 } from "uuid";

interface RegisterUserDTO {
  name: string;
  email: string;
  password: string;
  rol?: userRol; 
}

export class RegisterUser {
  constructor(
    private userRepo: IUserRepo,
    private passwordHasher: IPasswordHasher
  ) {}

  async execute(request: RegisterUserDTO): Promise<User> {
    const existingUser = await this.userRepo.findByEmail(request.email);
    if (existingUser) throw new Error("Email already registered");

    const hashedPassword = await this.passwordHasher.hash(request.password);

    const newUser: User = {
      id: uuidv4(),
      name: request.name,
      email: request.email,
      passwordHash: hashedPassword,
      rol: request.rol || "CLIENT",
      active: true,
    };

    await this.userRepo.save(newUser);

    return newUser;
  }
}
