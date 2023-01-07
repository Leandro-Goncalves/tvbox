import { inject, injectable } from "tsyringe";
import { IAppVersionRepository } from "@modules/appVersion/repositories/IAppVersionRepository";
import { AppVersion } from "@modules/appVersion/entities/AppVersion";

@injectable()
class GetLastVersionUseCase {
  constructor(
    @inject("AppVersionRepository")
    private appVersionRepository: IAppVersionRepository
  ) {}

  async execute(): Promise<AppVersion> {
    const appVersions = await this.appVersionRepository.findAll();

    const highestAppVersion = this.findHighestAppVersion(appVersions);

    return highestAppVersion;
  }

  private findHighestAppVersion(appVersions: AppVersion[]) {
    let highestAppVersion: AppVersion;
    appVersions.forEach((appVersion) => {
      if (!highestAppVersion) {
        highestAppVersion = appVersion;
        return;
      }

      const [major, minor, path] = appVersion.version.split(".");
      const [highestMajor, highestMinor, highestPath] =
        highestAppVersion.version.split(".");

      if (major > highestMajor) {
        highestAppVersion = appVersion;
        return;
      }

      if (minor > highestMinor) {
        highestAppVersion = appVersion;
        return;
      }

      if (path > highestPath) {
        highestAppVersion = appVersion;
        return;
      }
    });

    return highestAppVersion;
  }
}

export { GetLastVersionUseCase };
