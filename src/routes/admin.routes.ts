import { ListUsersController } from "@modules/users/useCases/listUsers/ListUsersController";
import { DeleteUserController } from "@modules/users/useCases/deleteUser/DeleteUserController";
import { Router } from "express";
import { ensureAdmin } from "@utils/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@utils/middlewares/ensureAuthenticated";

const adminRoutes = Router();

adminRoutes.get(
  "/users",
  ensureAuthenticated,
  ensureAdmin,
  ListUsersController.handle
);

adminRoutes.delete(
  "/users/:id",
  ensureAuthenticated,
  ensureAdmin,
  DeleteUserController.handle
);

export { adminRoutes };
