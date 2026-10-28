// PACKAGES
import express from "express";
// CONFIGS
import sessionMiddleware from "./config/sessions.js";
// ROUTES
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(sessionMiddleware);
// APIs
app.use("/api/auth", authRouter);
app.use((req, res, next) => {
  if (!req.session.isLogged) {
    return res.json({ message: "Please logIn first" });
  } else {
    next();
  }
});
// req.session.role === "user"

app.use(
  "/api/user",
  (req, res, next) => {
    if (req.session.role !== "user") {
      return res.json({ err: "Access denied" });
    } else {
      next();
    }
  },
  userRouter,
);
app.use(
  "/api/admin",
  (req, res, next) => {
    if (req.session.role !== "admin") {
      return res.json({ err: "Access denied" });
    } else {
      next();
    }
  },
  adminRouter,
);

export default app;
