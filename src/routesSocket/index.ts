import { Server } from "socket.io";

import { UserRoutes } from "./user.routes";
import { AdminRoutes } from "./admin.routes";

export const RouterSocket = (server: any) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  console.log(io);

  const admin = io.of("/admin");
  AdminRoutes(io, admin);
  UserRoutes(io, admin);
};
