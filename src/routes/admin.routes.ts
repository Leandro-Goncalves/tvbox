import { ListUsersController } from "@modules/users/useCases/listUsers/ListUsersController";
import { Router } from "express";
import { ensureAdmin } from "util/middlewares/ensureAdmin";
import { ensureAuthenticated } from "util/middlewares/ensureAuthenticated";

const adminRoutes = Router();

adminRoutes.get(
  "/users",
  ensureAuthenticated,
  ensureAdmin,
  ListUsersController.handle
);

export { adminRoutes };
