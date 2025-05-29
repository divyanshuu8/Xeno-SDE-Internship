import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import Home from "../pages/Home";
import Login from "../components/Login";
import toast, { Toaster } from "react-hot-toast";
import API from "./api";
import Dashboard from "../pages/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/api/auth/status")
      .then((res) => setIsLoggedIn(res.data.isLoggedIn))
      .catch((err) => console.log("Auth check error:", err));

    const handleMessage = (event) => {
      if (event.origin !== "http://localhost:5000") return;

      if (event.data.success) {
        toast.success("OAuth login successful");
        setIsLoggedIn(true);
        navigate("/dashboard");
      } else {
        toast.error("OAuth login failed");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#ffffff",
            color: "#007BFF",
            fontWeight: "bold",
            border: "1px solid #0056b3",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            padding: "12px 16px",
            borderRadius: "8px",
          },
        }}
      />
      <NavbarComponent isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
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
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
