import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tabs from "../utils/Tab";
import toast from "react-hot-toast";

const Login = ({ setIsLoggedIn, setActiveTab, activeTab }) => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (activeTab === "register") {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: fullName, email, password }),
          credentials: "include",
        });
        const result = await response.json();
        if (response.ok) {
          toast.success(result.message);
          setActiveTab("login");
          navigate("/login");
        } else toast.error(result.message);
      } catch (error) {
        console.error("Sign up error:", error);
        toast.error("An error occurred during sign up.");
      }
    } else {
      try {
        const response = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        });
        const result = await response.json();
        if (response.ok) {
          toast.success(result.message);
          setIsLoggedIn(true);
          navigate("/");
        } else toast.error(result.message);
      } catch (error) {
        console.error("Login error:", error);
        toast.error("An error occurred during login.");
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <h3 className="card-title text-center mb-4">
                {activeTab === "register" ? "Sign Up" : "Login"}
              </h3>
              <form onSubmit={handleSubmit}>
                {/* Tabs for Login/Sign Up */}
                <Tabs activeTab={activeTab} onChange={handleTabChange} />

                {/* Full Name - only shown when it's Sign Up */}
                {activeTab === "register" && (
                  <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                )}

                {/* Email Input */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Confirm Password - only shown when it's Sign Up */}
                {activeTab === "register" && (
                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                )}

                {/* Login or Sign Up Button */}
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    {activeTab === "register" ? "Sign Up" : "Login"}
                  </button>
                </div>
              </form>

              <div className="text-center mt-3">
                <a href="/" className="text-decoration-none">
                  Forgot Password?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
