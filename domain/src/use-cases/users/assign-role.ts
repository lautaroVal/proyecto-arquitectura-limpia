import { IUserRepo } from "../../repositories/index";
import { userRol } from "../../entities/index";

interface AssignRoleDTO {
  adminId: string;
  userId: string;
  newRole: userRol;
}

export class AssignRole {
  constructor(private readonly userRepo: IUserRepo) { }

  async execute(data: AssignRoleDTO): Promise<void> {
    const admin = await this.userRepo.findById(data.adminId);
    if (!admin || admin.rol !== "ADMIN") {
      throw new Error("Unauthorized: only admins can assign roles");
    }

    const user = await this.userRepo.findById(data.userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.rol = data.newRole;
    await this.userRepo.save(user);
  }
}
