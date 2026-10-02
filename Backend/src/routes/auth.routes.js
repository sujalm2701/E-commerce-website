import { Router } from "express";
import * as authController from "../controller/auth.controller";

const authRouter = Router();
// ex- /api/auth/register

// products
userRouter.post("/register", authController.postCreateAcc);
userRouter.post("/login", authController.postAuthUser);
userRouter.get("/me", authController.getInfo);
userRouter.post("/logout", authController.postDelUser);

export default authRouter;
