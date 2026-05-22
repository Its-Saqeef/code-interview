import { Request, Response, NextFunction } from "express";

/**
 * Custom Error class for operational errors that we want to return to the client.
 */
export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        
        // Capture the stack trace, excluding the constructor call from the trace
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Wraps an async Express handler to catch unhandled promise rejections and forward them to next()
 */
export const catchAsync = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
