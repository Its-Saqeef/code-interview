import { Router } from "express";
import { registerUser, getUser } from "../controllers/user.controller.ts";


const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.get("/:id", getUser);

export default userRouter;