import { Connection, createConnection, getConnectionOptions } from "typeorm";
import path from "path";

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  console.log("defaultOptions2", defaultOptions);
  return createConnection(
    Object.assign(defaultOptions, {
      migrations: defaultOptions.migrations.map((migration) => {
        const p = path.join(__dirname, "migrations", migration as string);
        console.log("p", p);
        return p;
      }),
      database:
        process.env.NODE_ENV === "test"
          ? "database_test"
          : defaultOptions.database,
    })
  );
};
