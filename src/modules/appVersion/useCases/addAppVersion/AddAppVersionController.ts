import { Request, Response } from "express";
import { container } from "tsyringe";
import { AddAppVersionUseCase } from "./AddAppVersionUseCase";
import * as path from "path";
import { AppError } from "@shared/errors/AppError";

class AddAppVersionController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { version } = req.body;
    const fileName = req.file.filename;
    const fileExtension = path.extname(req.file.path);

    if (!version) {
      throw new AppError("app version is missing");
    }

    if (!version.match(/(\d|x|\*)+\.(\d|x|\*)+\.(\d|x|\*)+/g)) {
      throw new AppError("app version is not valid");
    }

    if (fileExtension !== ".apk") {
      throw new Error("app is not a apk file");
    }

    const addAppVersionControllerUseCase =
      container.resolve(AddAppVersionUseCase);

    const response = await addAppVersionControllerUseCase.execute(
      fileName,
      version
    );

    return res.json({ response });
  }
}

export { AddAppVersionController };
