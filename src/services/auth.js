import crypto from "node:crypto"
import { Session } from "../models/session.js"
import { FIFTEEN_MINUTES, ONE_DAY } from "../constants/time.js"

export const createSession = async (userId) => {
    return Session.create({
        userId,
        accessToken: crypto.randomUUID(),
        refreshToken: crypto.rannomUUID(),
        accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(Date.now()+ ONE_DAY),
    });
};

export const setSessionCookies = (res, session) => {
 res.cookie("accsessToken", session.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: false,
    maxAge: FIFTEEN_MINUTES,
 });

  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: false,
    maxAge: ONE_DAY,
 });

   res.cookie("sessionId", session._id, {
    httpOnly: true,
    secure: true,
    sameSite: false,
    maxAge: ONE_DAY,
 });
}