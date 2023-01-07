import { AppVersion } from "../entities/AppVersion";

interface IAppVersionRepository {
  create(version: string, path: string): Promise<void>;
  findByGuid(guid: string): Promise<AppVersion>;
  findAll(): Promise<AppVersion[]>;
}

export { IAppVersionRepository };
