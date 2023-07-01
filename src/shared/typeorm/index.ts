import { Connection, createConnection, getConnectionOptions } from "typeorm";
import { User } from "@modules/users/entities/User";
import { AppVersion } from "@modules/appVersion/entities/AppVersion";

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  console.log("defaultOptions2", defaultOptions);
  return createConnection(
    Object.assign(defaultOptions, {
      entities: [User, AppVersion],
      database:
        process.env.NODE_ENV === "test"
          ? "database_test"
          : defaultOptions.database,
    })
  );
};
