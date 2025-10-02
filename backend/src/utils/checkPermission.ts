import { NextFunction, Request, Response } from "express";
import appAssert from "./appAssert";
import { FORBIDDEN } from "../constants/http";

export function checkPermission(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    appAssert(
      roles.includes(req.role),
      FORBIDDEN,
      "You can not perform this action."
    );
    next();
  };
}
