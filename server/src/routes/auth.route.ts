import { Router } from "express";
import {
    getMe,
    getMyLanguages,
    getMyStats,
    getMySubmissions,
    login,
    logout,
    updateMe,
} from "../controllers/auth.controller.ts";
import { authMiddleware } from "../middleware/auth.middleware.ts";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/me", authMiddleware, getMe);
authRouter.patch("/me", authMiddleware, updateMe);
authRouter.get("/me/stats", authMiddleware, getMyStats);
authRouter.get("/me/submissions", authMiddleware, getMySubmissions);
authRouter.get("/me/languages", authMiddleware, getMyLanguages);

export default authRouter;
