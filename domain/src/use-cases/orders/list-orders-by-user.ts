import { IOrderRepo, IUserRepo } from "../../repositories/index";
import { Order } from "../../entities/index";

interface ListOrdersByUserDTO {
  userId: string;
}

export class ListOrdersByUser {
  constructor(
    private userRepo: IUserRepo,
    private orderRepo: IOrderRepo
  ) { }

  async execute(data: ListOrdersByUserDTO): Promise<Order[]> {
    const user = await this.userRepo.findById(data.userId);
    if (!user) {
      throw new Error("User not found.");
    }
    const orders = await this.orderRepo.findByClientId(data.userId);

    return orders;
  }
}
