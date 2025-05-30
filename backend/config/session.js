// session.js
const session = require("express-session");
const MongoStore = require("connect-mongo");

module.exports = (mongoUrl, sessionSecret) => {
  return session({
    name: "session",
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl,
      collectionName: "sessions",
      crypto: {
        secret: sessionSecret,
      },
      touchAfter: 24 * 60 * 60, // time period in seconds
    }),
    cookie: {
      httpOnly: true,
      secure: true, // only HTTPS in production (required by browsers)
      sameSite: "none", // required for cross-origin cookies (Netlify <-> Render)
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  });
};
