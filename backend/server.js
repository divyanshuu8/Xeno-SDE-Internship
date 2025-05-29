require("dotenv").config();
require("./config/passport");
const dataRoutes = require("./routes/dataRoutes"); // Path as per your folder structure
const cookieParser = require('cookie-parser');



const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");

const sessionMiddleware = require("./config/session");
const authRoutes = require("./routes/authRoutes");

const app = express();

const mongoUrl = process.env.MONGO_URL;
const sessionSecret = process.env.SESSION_SECRET;
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5767",
    credentials: true,
  })
);

// MongoDB Connection
mongoose
  .connect(mongoUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Session
app.use(express.json());
app.use(sessionMiddleware(mongoUrl, sessionSecret));
app.use(cookieParser());

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(authRoutes);
app.use("/api", dataRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
