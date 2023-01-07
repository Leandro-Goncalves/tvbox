import { AppVersion } from "@modules/appVersion/entities/AppVersion";
import { getRepository, Repository } from "typeorm";
import { IAppVersionRepository } from "../IAppVersionRepository";

class AppVersionRepository implements IAppVersionRepository {
  private repository: Repository<AppVersion>;

  constructor() {
    this.repository = getRepository(AppVersion);
  }
  async create(version: string, path: string): Promise<void> {
    const user = this.repository.create({
      version,
      path,
    });

    await this.repository.save(user);
  }

  async findByGuid(guid: string): Promise<AppVersion> {
    return this.repository.findOne(guid);
  }

  async findAll(): Promise<AppVersion[]> {
    const AppVersions = await this.repository.find();
    return AppVersions;
  }
}

export { AppVersionRepository };
