import { IUserRepo } from "../../repositories/index";
import { User } from "../../entities/index";

export class GetUserById {
  constructor(private readonly userRepo: IUserRepo) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}
