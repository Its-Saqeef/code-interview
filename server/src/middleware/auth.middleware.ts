import express from "express";
import { verifyToken } from "../services/jwtService.ts";
import { AppError, catchAsync } from "../utils/errors.ts";

export const authMiddleware = catchAsync(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const decodedToken = await verifyToken(req);
    if (!decodedToken) {
        throw new AppError("Invalid token", 401);
    }
    req.body = req.body || {};
    req.body.user = decodedToken;
    next();
});