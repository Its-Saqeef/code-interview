import express from "express";
import { verifyToken } from "../services/jwtService.ts";

export async function getOptionalUserId(req: express.Request): Promise<string | null> {
    const decoded = await verifyToken(req);

    if (!decoded || typeof decoded !== "object" || !("id" in decoded)) {
        return null;
    }

    const { id } = decoded as { id?: unknown };
    return typeof id === "string" ? id : null;
}
