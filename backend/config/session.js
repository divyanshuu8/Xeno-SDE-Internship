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
      // No crypto option here — sessions will be stored as plain JSON
      touchAfter: 24 * 60 * 60, // time period in seconds
    }),
    cookie: {
      httpOnly: true,
      secure: true, // HTTPS only in production
      sameSite: "none", // needed for cross-origin cookies (Netlify frontend + Render backend)
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  });
};
