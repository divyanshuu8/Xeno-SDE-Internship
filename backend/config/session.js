const session = require("express-session");
const MongoStore = require("connect-mongo");

module.exports = (mongoUrl, sessionSecret) => {
  return session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: mongoUrl,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  });
};
