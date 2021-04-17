import { Router } from "express";
import { RegistryController } from "../controllers";

const router = Router();
const controller = new RegistryController();

router.put(
  "/:serviceName/:serviceVersion/:servicePort",
  controller.registerService
);
router.delete(
  "/:serviceName/:serviceVersion/:servicePort",
  controller.unregisterService
);

router.get("/:serviceName/:serviceVersion", controller.findService);

export default router;
