import { Request, Response } from "express";
import { updateUsers } from "../../../../routesSocket/user.routes";
import { container } from "tsyringe";

import { DeleteUserUseCase } from "./DeleteUserUseCase";

class DeleteUserController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteUserUseCase = container.resolve(DeleteUserUseCase);

    await deleteUserUseCase.execute(id);

    if (global.socketAdmin) {
      updateUsers(global.socketAdmin);
    }

    return res.json({ ok: true });
  }
}

export { DeleteUserController };
