import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { name, password } = req.body;
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const response = await authenticateUserUseCase.execute({
      name,
      password,
    });

    return res.json(response);
  }
}

export { AuthenticateUserController };
