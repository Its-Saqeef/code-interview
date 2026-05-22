import express from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/errors.ts";

/**
 * Express global error handling middleware.
 * Placed at the very end of the middleware chain to intercept all uncaught errors.
 */
export const globalErrorHandler = (
    err: any,
    req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: express.NextFunction
) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";
    const success = false;

    // Handle schema validation errors from Zod
    if (err instanceof ZodError) {
        statusCode = 400;
        message = err.issues?.[0]?.message || "Validation failed";
    }

    // Mask unexpected programming or database errors in production
    if (statusCode === 500) {
        console.error("🔥 Server Error caught in globalErrorHandler:", err);
        message = "Internal Server Error";
    }

    return res.status(statusCode).json({
        success,
        message,
        ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    });
};
