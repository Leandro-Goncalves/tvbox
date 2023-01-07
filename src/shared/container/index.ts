import { container } from "tsyringe";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { UsersRepository } from "@modules/users/repositories/typeorm/UsersRepository";
import { AppVersionRepository } from "@modules/appVersion/repositories/typeorm/AppVersionRepository";
import { IAppVersionRepository } from "@modules/appVersion/repositories/IAppVersionRepository";

import "./providers";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IAppVersionRepository>(
  "AppVersionRepository",
  AppVersionRepository
);
