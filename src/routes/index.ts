import { Router } from "express";
import RegistryRouter from "./registry.routes";

const routes = Router();

routes.use("/registry", RegistryRouter);

export default routes;
