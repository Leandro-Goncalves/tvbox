import { inject, injectable } from "tsyringe";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { IAppVersionRepository } from "@modules/appVersion/repositories/IAppVersionRepository";
import uploadConfig from "@configs/upload";
import * as path from "path";

@injectable()
class AddAppVersionUseCase {
  constructor(
    @inject("StorageProvider")
    private storageProvider: IStorageProvider,

    @inject("AppVersionRepository")
    private appVersionRepository: IAppVersionRepository
  ) {}

  async execute(appName: string, version: string): Promise<string> {
    const fileName = await this.storageProvider.save(
      appName,
      "appsVersions",
      `${version}.apk`
    );

    await this.appVersionRepository.create(version, fileName);

    return fileName;
  }
}

export { AddAppVersionUseCase };
