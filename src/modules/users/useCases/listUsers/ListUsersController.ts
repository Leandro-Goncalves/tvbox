import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUsersUseCase } from "./ListUsersUseCase";

class ListUsersController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const listUsersUseCase = container.resolve(ListUsersUseCase);

    const users = await listUsersUseCase.execute();

    return res.json(users);
  }
}

export { ListUsersController };
