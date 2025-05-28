import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import Home from "../pages/Home";
import Login from "../components/Login";

function App() {
  // Define the states here
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("login"); // or any default tab

  useEffect(() => {
    // Fetch auth status on first load
    fetch("http://localhost:5000/api/auth/status", {
      credentials: "include", // include cookies
    })
      .then((res) => res.json())
      .then((data) => setIsLoggedIn(data.isLoggedIn))
      .catch((err) => console.log("Auth check error:", err));

    // Listen for messages from popup
    const handleMessage = (event) => {
      if (event.origin !== "http://localhost:5000") return; // adjust for production

      if (event.data.success) {
        console.log("OAuth login successful:", event.data.message);
        setIsLoggedIn(true); // immediately update login state

        // Optional: Fetch user data again if needed
        // fetch("http://localhost:5000/api/me", { credentials: "include" }).then(...)
      } else {
        console.warn("OAuth login failed:", event.data.message);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <Router>
      <NavbarComponent isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setActiveTab={setActiveTab}
              activeTab={activeTab}
            />
          }
        />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
