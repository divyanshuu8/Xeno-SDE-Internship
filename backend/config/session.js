const session = require("express-session");
const MongoStore = require("connect-mongo");

module.exports = (mongoUrl, sessionSecret) => {
  const isProduction = process.env.NODE_ENV === "production";
  return session({
    name: isProduction ? "sid" : undefined, // Custom session cookie name in production
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: mongoUrl,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      secure: isProduction, // Only send cookie over HTTPS in production
      sameSite: isProduction ? "none" : "lax", // None in production for cross-site, lax in dev
      httpOnly: true, // Prevent client-side JS from accessing the cookie
    },
    proxy: isProduction, // Trust the reverse proxy in production
  });
};
