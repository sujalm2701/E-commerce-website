import { Router } from "express";
import * as authController from "../controller/auth.controller.js";

const authRouter = Router();
// ex- /api/auth/register

// products
userRouter.post("/register", authController.postSignUp);
userRouter.post("/login", authController.postSignIn)
userRouter.post("/logout", authController.postLogout);

export default authRouter;
