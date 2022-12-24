import { AuthenticateUserController } from "@modules/users/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/", CreateUserController.handle);
userRoutes.post("/login", AuthenticateUserController.handle);

export { userRoutes };
