import { Router } from "express";
import { getProblemDetail, getProblems } from "../controllers/problems.controller.ts";
import { runProblemCode } from "../controllers/run.controller.ts";
import { createSubmission } from "../controllers/submissions.controller.ts";
import { authMiddleware } from "../middleware/auth.middleware.ts";

const problemsRouter = Router();

problemsRouter.get("/", getProblems);
problemsRouter.get("/:slug", getProblemDetail);
problemsRouter.post("/:slug/run", authMiddleware, runProblemCode);
problemsRouter.post("/:slug/submissions", authMiddleware, createSubmission);

export default problemsRouter;
