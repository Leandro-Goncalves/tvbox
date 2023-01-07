import { Router } from "express";

import { adminRoutes } from "./admin.routes";
import { appVersionRoutes } from "./appVersion.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/appVersion", appVersionRoutes);

export { router };
