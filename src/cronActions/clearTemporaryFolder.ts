import cron from "node-cron";
import fs from "fs";
import uploadConfig from "@configs/upload";
import { promisify } from "util";
import * as path from "path";

const fsStat = promisify(fs.stat);
const fsReaddir = promisify(fs.readdir);

export const clearTemporaryFolder = async () => {
  cron.schedule("* * * * *", async () => {
    try {
      console.log("cleaning tmp files");
      const tmpFiles = await fsReaddir(uploadConfig.tmpFolder);
      tmpFiles.map(async (tmpFile) => {
        const filePath = path.join(uploadConfig.tmpFolder, tmpFile);
        const fileStatus = await fsStat(filePath);

        if (!fileStatus.isDirectory()) {
          fs.unlink(filePath, () => {});
        }
      });
    } catch (e) {
      throw new Error(e);
    }
  });
};
