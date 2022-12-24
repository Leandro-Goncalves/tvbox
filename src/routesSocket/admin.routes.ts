import { ListUsersControllerSocket } from "@modules/users/useCases/listUsers/ListUsersControllerSocket";
import { Namespace, Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { container } from "tsyringe";
import { ensureAdminSocket } from "@utils/middlewares/ensureAdmin";
import { ensureAuthenticatedSocket } from "@utils/middlewares/ensureAuthenticated";
import { ActionsUser } from "./actions/user";
import { updateUsers } from "./user.routes";

const AdminRoutes = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  admin: Namespace<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  admin.use(ensureAuthenticatedSocket);
  admin.use(ensureAdminSocket);

  admin.on("connection", (socket) => {
    const actionsUser = container.resolve(ActionsUser);

    socket.on("getUsers", async (callback) => {
      const users = await ListUsersControllerSocket.handle();
      callback(users);
    });

    socket.on("rebootUser", (deviceId) => {
      console.log("reboot", deviceId);
      io.to(deviceId).emit("reboot");
    });

    socket.on("blockUser", async (deviceId) => {
      const userIsBlocked = await actionsUser.isBLocked(deviceId);
      await actionsUser.updateIsBlocked(deviceId, !userIsBlocked);

      await updateUsers(admin);
      io.to(deviceId).emit("reboot");
    });

    socket.on("disconnect", () => {
      console.log("admin disconnected");
    });
  });
};

export { AdminRoutes };
