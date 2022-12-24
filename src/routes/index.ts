import { Router } from "express";

import { adminRoutes } from "./admin.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/user", userRoutes);
router.use("/admin", adminRoutes);

export { router };
