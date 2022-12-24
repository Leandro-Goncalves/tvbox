import { ListUsersControllerSocket } from "@modules/users/useCases/listUsers/ListUsersControllerSocket";
import { Namespace, Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { container } from "tsyringe";
import { ensureAuthenticatedSocket } from "util/middlewares/ensureAuthenticated";
import { ActionsUser } from "./actions/user";

export const updateUsers = async (
  admin: Namespace<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  const users = await ListUsersControllerSocket.handle();
  admin.emit("updateUsers", users);
};

const UserRoutes = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  admin: Namespace<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  io.use(ensureAuthenticatedSocket);

  io.on("connection", async (socket) => {
    const actionsUser = container.resolve(ActionsUser);
    const { sub: id } = socket.data;
    console.log("a user connected", id);
    socket.join(id);
    const userIsBlocked = await actionsUser.isBLocked(id);

    if (userIsBlocked) {
      socket.emit("reboot");
      return;
    }

    await actionsUser.updateIsActive(id, true);

    await updateUsers(admin);

    socket.on("openApp", async (appName) => {
      console.log(appName);
      await actionsUser.updateAppName(id, appName);
      await updateUsers(admin);
    });

    socket.on("disconnect", async () => {
      await actionsUser.updateIsActive(id, false);

      await updateUsers(admin);
      console.log("user disconnected");
    });
  });
};

export { UserRoutes };
