import { Server } from "socket.io";

import { UserRoutes } from "./user.routes";
import { AdminRoutes } from "./admin.routes";

export const RouterSocket = (server: any) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  const admin = io.of("/admin");
  AdminRoutes(io, admin);
  UserRoutes(io, admin);
};
