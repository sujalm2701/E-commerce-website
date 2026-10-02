import express from "express";
import userRouter from "./routes/user.routes";
import adminRouter from "./routes/admin.routes";
import authRouter from "./routes/auth.routes";

const app = express();

app.use(express.urlencoded());

// APIs
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

export default app;
