import { http } from "index";
import { Server } from "socket.io";

import { UserRoutes } from "./user.routes";
import { AdminRoutes } from "./admin.routes";

const io = new Server(http, {
  cors: { origin: "*" },
});

const admin = io.of("/admin");
AdminRoutes(io, admin);
UserRoutes(io, admin);
