import { Request } from "express";

export const getIpAddress = (req: Request): string =>
  req.socket.remoteAddress?.includes("::")
    ? (`[${req.socket.remoteAddress}]` as string)
    : (req.socket.remoteAddress as string);
