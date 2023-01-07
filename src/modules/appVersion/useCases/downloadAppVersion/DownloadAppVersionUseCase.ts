import { inject, injectable } from "tsyringe";
import { IAppVersionRepository } from "@modules/appVersion/repositories/IAppVersionRepository";

@injectable()
class DownloadAppVersionUseCase {
  constructor(
    @inject("AppVersionRepository")
    private appVersionRepository: IAppVersionRepository
  ) {}

  async execute(appGuid: string): Promise<string> {
    const appVersion = await this.appVersionRepository.findByGuid(appGuid);

    return appVersion.path;
  }
}

export { DownloadAppVersionUseCase };
