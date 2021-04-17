import { NextFunction, Request, Response } from "express";
import ServiceRegistry from "../libs/ServiceRegistry";
import { createError, getIpAddress, sendError, sendResponse } from "../utils";

const serviceRegistry = new ServiceRegistry();

export default class RegistryController {
  registerService(req: Request, res: Response, next: NextFunction) {
    const { serviceName, serviceVersion, servicePort } = req.params;
    const serviceIp = getIpAddress(req);

    // console.log(serviceIp);

    const serviceKey = serviceRegistry.register(
      serviceName,
      serviceVersion,
      serviceIp,
      servicePort
    );

    sendResponse(res, 201, { key: serviceKey });
  }

  unregisterService(req: Request, res: Response, next: NextFunction) {
    const { serviceName, serviceVersion, servicePort } = req.params;

    const serviceIp = getIpAddress(req);
    const serviceKey = serviceRegistry.unregister(
      serviceName,
      serviceVersion,
      serviceIp,
      servicePort
    );

    sendResponse(res, 200, { key: serviceKey });
  }

  findService(req: Request, res: Response, next: NextFunction) {
    try {
      const { serviceName, serviceVersion } = req.params;
      const srv = serviceRegistry.get(serviceName, serviceVersion);
      if (!srv) throw createError("Service not found", 404);
      sendResponse(res, 200, srv ?? {});
    } catch (error) {
      sendError(error, next);
    }
  }
}
