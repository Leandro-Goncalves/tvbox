import { ListUsersControllerSocket } from "@modules/users/useCases/listUsers/ListUsersControllerSocket";
import { Namespace, Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { ensureAuthenticatedSocket } from "@utils/middlewares/ensureAuthenticated";
import { ActionsUser } from "./actions/user";
import { isBefore } from "date-fns";

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
  global.socketAdmin = admin;
  io.use(ensureAuthenticatedSocket);

  io.on("connection", async (socket) => {
    const actionsUser = new ActionsUser();
    const { sub: id } = socket.data;
    console.log("a user connected", id);
    socket.join(id);
    const userIsBlocked = await actionsUser.isBLocked(id);

    if (userIsBlocked) {
      socket.emit("reboot");
      return;
    }

    const expirationDate = await actionsUser.expirationDate(id);
    if (expirationDate) {
      socket.emit("expirationDate", expirationDate);

      const isExpired = isBefore(expirationDate, new Date());

      if (isExpired) {
        setTimeout(() => {
          socket.emit("reboot");
        }, 30 * 1000); // 30 seconds
      }
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
      await actionsUser.updateAppName(id, undefined);

      await updateUsers(admin);
      console.log("user disconnected");
    });
  });
};

export { UserRoutes };
