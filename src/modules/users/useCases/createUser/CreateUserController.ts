import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { name, password } = req.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      password,
    });

    return res.status(201).send();
  }
}

export { CreateUserController };
