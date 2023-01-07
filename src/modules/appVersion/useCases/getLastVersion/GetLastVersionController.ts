import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetLastVersionUseCase } from "./GetLastVersionUseCase";

class GetLastVersionController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const getLastVersionUseCase = container.resolve(GetLastVersionUseCase);

    const AppVersion = await getLastVersionUseCase.execute();

    return res.json(AppVersion);
  }
}

export { GetLastVersionController };
