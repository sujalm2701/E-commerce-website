import { Router } from "express";
import * as authController from "../controller/auth.controller.js";

const authRouter = Router();
// ex- /api/auth/register

// products
authRouter.post("/register", authController.postSignUp);
authRouter.post("/login", authController.postSignIn)
authRouter.post("/logout", authController.postLogout);

export default authRouter;
