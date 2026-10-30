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
app.use(express.json())
app.use(sessionMiddleware);
// APIs
app.use("/api/auth", authRouter);
app.use((req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.status(401).json({ message: "Please logIn first" });
  } else {
    next();
  }
});
// req.session.role === "user"

app.use(
  "/api/user",
  (req, res, next) => {
    if (req.session.role !== "user") {
      return res.status(403).json({ err: "Access denied" });
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
      return res.status(403).json({ err: "Access denied" });
    } else {
      next();
    }
  },
  adminRouter,
);

// API status responses
app.use("/api", (req, res, next) => {
  res.status(404).json({ err: "API route not found." });
});
export default app;
