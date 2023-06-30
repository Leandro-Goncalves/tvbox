import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  console.log("defaultOptions", defaultOptions);
  return createConnection(
    Object.assign(defaultOptions, {
      database:
        process.env.NODE_ENV === "test"
          ? "database_test"
          : defaultOptions.database,
    })
  );
};
