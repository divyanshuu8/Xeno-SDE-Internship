const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/auth/google/callback", (req, res, next) => {
  passport.authenticate("google", (err, user) => {
    if (err || !user) {
      res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
      res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");

      return res.send(`
        <script>
          window.opener.postMessage({ success: false, message: "Login failed" }, "*");
          window.close();
        </script>
      `);
    }

    req.logIn(user, (err) => {
      res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
      res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");

      if (err) {
        return res.send(`
          <script>
            window.opener.postMessage({ success: false, message: "Login failed" }, "*");
            window.close();
          </script>
        `);
      }

      return res.send(`
        <script>
          window.opener.postMessage({ success: true, message: "Login successful" }, "*");
          window.close();
        </script>
      `);
    });
  })(req, res, next);
});

router.get("/api/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

router.get("/api/auth/status", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isLoggedIn: true, user: req.user });
  } else {
    res.json({ isLoggedIn: false });
  }
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy((err) => {
      if (err) console.log(err);
      // Clear the correct session cookie name based on environment
      const cookieName =
        process.env.NODE_ENV === "production" ? "sid" : "connect.sid";
      res.clearCookie(cookieName, {
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
      });
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

module.exports = router;
