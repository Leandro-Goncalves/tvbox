import { AddAppVersionController } from "@modules/appVersion/useCases/addAppVersion/AddAppVersionController";
import { Router } from "express";
import multer from "multer";
import uploadConfig from "@configs/upload";
import { DownloadAppVersion } from "@modules/appVersion/useCases/downloadAppVersion/DownloadAppVersionController";
import { GetLastVersionController } from "@modules/appVersion/useCases/getLastVersion/GetLastVersionController";

const uploadAppVersion = multer(uploadConfig);

const appVersionRoutes = Router();

appVersionRoutes.post(
  "/",
  uploadAppVersion.single("app"),
  AddAppVersionController.handle
);

appVersionRoutes.get("/download/:versionId", DownloadAppVersion.handle);

appVersionRoutes.get("/lastVersion", GetLastVersionController.handle);

export { appVersionRoutes };
