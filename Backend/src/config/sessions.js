import session from "express-session";
import MongoDBStore from "connect-mongodb-session";

const sessionMiddleware = session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store: MongoDBStore.create({
      mongoUrl: config.MONGO_URI,
      collection: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  });

export default sessionMiddleware;