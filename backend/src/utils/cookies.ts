import { CookieOptions, Response } from "express";
import { thirtyDaysFromNow, thirtyMinutesFromNow } from "./date";

const secure = process.env.NODE_ENV !== "development";

export const REFRESH_PATH = "/auth/refresh";

const defaults: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure,
};

export const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: thirtyMinutesFromNow(),
});

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: thirtyDaysFromNow(),
  path: REFRESH_PATH,
});

type Params = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) => {
  return res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());
};

export const clearAuthCookies = (res: Response) => {
  return res.clearCookie("accessToken").clearCookie("refreshToken", {
    path: REFRESH_PATH,
  });
};
