import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import Home from "../pages/Home";
import Login from "../components/Login";
import toast, { Toaster } from "react-hot-toast";
import API from "./api";
import Dashboard from "../pages/Dashboard";
import CampaignLog from "../pages/CampaignLog";
import SaaSFooter from "../components/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/api/auth/status")
      .then((res) => setIsLoggedIn(res.data.isLoggedIn))
      .catch((err) => console.log("Auth check error:", err));

    const handleMessage = (event) => {
      const allowedOrigin = new URL(API.defaults.baseURL).origin;
      if (event.origin !== allowedOrigin) return;

      if (event.data.success) {
        // Immediately check session status from backend after OAuth
        API.get("/api/auth/status")
          .then((res) => {
            if (res.data.isLoggedIn) {
              toast.success("OAuth login successful");
              setIsLoggedIn(true);
              navigate("/dashboard");
            } else {
              toast.error("Session not established. Please try again.");
            }
          })
          .catch(() => {
            toast.error("Session check failed. Please try again.");
          });
      } else {
        toast.error("OAuth login failed");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [navigate]);

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
        <Route path="/dashboard/:logId" element={<CampaignLog />} />
      </Routes>
      <SaaSFooter />
    </>
  );
}

export default App;
