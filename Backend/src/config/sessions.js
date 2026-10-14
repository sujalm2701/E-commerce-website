import session from "express-session";
import MongoDBStore from "connect-mongodb-session";

const sessionMiddleware = session({
    secret: "12345",
    resave: false,
    saveUninitialized: false,

    store: MongoDBStore.create({
      mongoUrl: "1234",
      collection: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  });

export default sessionMiddleware;