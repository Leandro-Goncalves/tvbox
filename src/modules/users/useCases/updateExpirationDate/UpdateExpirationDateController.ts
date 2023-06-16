import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateExpirationDateUseCase } from "./UpdateExpirationDateUseCase";

class UpdateExpirationDateController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { months } = req.body;
    const updateExpirationDateUseCase = container.resolve(
      UpdateExpirationDateUseCase
    );

    await updateExpirationDateUseCase.execute(id, months);

    return res.send();
  }
}

export { UpdateExpirationDateController };
