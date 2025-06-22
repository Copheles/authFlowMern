import assert from "node:assert";
import { HttpStatusCode } from "../constants/http";
import AppErrorCode from "../constants/appErrorCode";
import AppError from "./AppError";

type AppAssert = (
  condition: any,
  httpStatusCode: HttpStatusCode,
  message: string,
  appErrorCode?: AppErrorCode
) => asserts condition;

/**
 * Asserts a condition and throws an AppError if the condition is falsy
 */

const appAssert: AppAssert = (
  conditon,
  httpStatusCode,
  message,
  appErrorCode
) => assert(conditon, new AppError(httpStatusCode, message, appErrorCode));

export default appAssert;
