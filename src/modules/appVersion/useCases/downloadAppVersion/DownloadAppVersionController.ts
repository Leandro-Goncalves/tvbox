import { Request, Response } from "express";
import { container } from "tsyringe";
import * as path from "path";
import uploadConfig from "@configs/upload";
import { DownloadAppVersionUseCase } from "./DownloadAppVersionUseCase";
import { isDev, isProd } from "@utils/enviroment";

class DownloadAppVersion {
  static async handle(req: Request, res: Response): Promise<void> {
    const { versionId } = req.params;
    console.log("id", versionId);

    const downloadAppVersionUseCase = container.resolve(
      DownloadAppVersionUseCase
    );

    const appPath = await downloadAppVersionUseCase.execute(versionId);
    const appStorePath = isDev()
      ? uploadConfig.tmpFolder
      : process.env.APK_STORE_PATH;
    const appCompletedPath = path.join(appStorePath, "appsVersions", appPath);

    if (isProd()) {
      res.redirect(307, appStorePath + "/appsVersions/" + appPath);
      return;
    }

    res.download(appCompletedPath, appPath);
    return;
  }
}

export { DownloadAppVersion };
