import { FORBIDDEN } from "../constants/http";
import AppError from "./AppError";

export function checkPermitResource<T extends { [key: string]: any }>(
  entity: T,
  entityProperty: string,
  userId: string,
  role: string
) {
  if (role === "admin") return;

  if (userId === entity![entityProperty]) return;

  throw new AppError(FORBIDDEN, "You can not perform this action.");
}
