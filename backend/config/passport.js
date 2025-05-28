const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Replace with actual user model or DB logic later
const User = {
  findOrCreate: async (profile, cb) => {
    // You should look into your DB for user, or create if not exist
    return cb(null, profile); // Temporary: Just pass Google profile
  },
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Google Profile:", profile);
      await User.findOrCreate(profile, (err, user) => {
        return done(err, user);
      });
    }
  )
);

// Serialize and deserialize user to/from session
passport.serializeUser((user, done) => {
  done(null, user); // Usually you store user.id
});

passport.deserializeUser((obj, done) => {
  done(null, obj); // Usually you look up user by ID here
});
