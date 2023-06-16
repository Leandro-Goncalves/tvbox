import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateExpirationDateUseCase } from "./UpdateExpirationDateUseCase";
import { updateUsers } from "routesSocket/user.routes";

class UpdateExpirationDateController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { months } = req.body;
    const updateExpirationDateUseCase = container.resolve(
      UpdateExpirationDateUseCase
    );

    await updateExpirationDateUseCase.execute(id, months);

    if (global.socketAdmin) {
      updateUsers(global.socketAdmin);
    }

    return res.send();
  }
}

export { UpdateExpirationDateController };
