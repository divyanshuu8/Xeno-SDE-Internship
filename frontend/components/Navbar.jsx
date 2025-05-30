import React from "react";
import { useNavigate } from "react-router-dom";
import API from "../src/api";
import toast from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // <-- Required for dropdowns & toggles

const NavbarComponent = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const handleDashboardClick = async () => {
    try {
      const res = await API.get("/api/auth/status");
      if (res.data.isLoggedIn) {
        navigate("/dashboard");
      } else {
        toast.error("Please log in first");
        navigate("/login");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      toast.error("Something went wrong");
    }
  };
  const handleSignOut = async () => {
    try {
      await API.get("/logout"); // Logout API call
      toast.success("Logged out successfully");
      // Optional: clear user state if stored
      setIsLoggedIn(false);
      navigate("/"); // Redirect to homepage or login
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed");
    }
  };
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
      <div className="container">
        <a className="navbar-brand text-primary fw-bold fs-2" href="/">
          Mi-CMS
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center flex-row gap-2">
            <li className="nav-item mx-2">
              {isLoggedIn ? (
                <button
                  className="btn btn-danger rounded-pill px-4"
                  onClick={handleSignOut}
                >
                  Sign out
                </button>
              ) : (
                <a
                  className="btn btn-outline-dark rounded-pill px-4"
                  href="/login"
                >
                  Sign in
                </a>
              )}
            </li>
            <li className="nav-item">
              {isLoggedIn ? (
                <button
                  className="btn btn-primary rounded-pill px-4"
                  onClick={handleDashboardClick}
                >
                  Dashboard
                </button>
              ) : (
                <button
                  className="btn btn-primary rounded-pill px-4"
                  onClick={handleDashboardClick}
                >
                  Get Started
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
