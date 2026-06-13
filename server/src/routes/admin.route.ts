import { Router } from "express";
import { addProblem } from "../controllers/admin.controller.ts";

const adminRouter = Router();

adminRouter.post("/add-problem", addProblem);


export default adminRouter;