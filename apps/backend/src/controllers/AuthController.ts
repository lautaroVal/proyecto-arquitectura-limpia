import { Request, Response } from "express";
import { UserServiceImplementationPrisma } from "../services/user-service-implementation-prisma.js";
import { BcryptHasher } from "../services/bcrypt-hasher-implementation-prisma.js";
import { RegisterUser } from "../../../../domain/dist/use-cases/users/register-user.js";
import { AuthUser } from "../../../../domain/dist/use-cases/users/auth-user.js";

export class AuthController {
   private service = new UserServiceImplementationPrisma();

  register = async(req: Request, res: Response) => {
    try {
      const hasher = new BcryptHasher();
      const userData = req.body;

      const useCase = new RegisterUser(this.service, hasher);
      const user = await useCase.execute(userData);
      res.status(201).json(user);
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }

  login = async (req: Request, res: Response) => {
    try {
      const hasher = new BcryptHasher();
      const userData = req.body;

      const useCase = new AuthUser(this.service, hasher);
      const token = await useCase.execute(userData);
      res.status(200).json({ token });
    } catch (error: any) {
      console.error(error);
      res.status(401).json({ error: error.message });
    }
  }
}
