import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../common/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const role = params.get("role") || "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      if (res.status === 200) {
        const { email: userEmail, userType, token } = res.data;

        if (userType.toLowerCase() !== role.toLowerCase()) {
          setMessage(`⚠️ Role mismatch: You are a ${userType}`);
        } else {
          setMessage("✅ Login successful");

          // ✅ Save token to localStorage
          localStorage.setItem("token", token);

          // Save user info
          localStorage.setItem("user", JSON.stringify({ email: userEmail, userType }));

          setTimeout(() => {
            navigate(`/dashboard/${userType.toLowerCase()}`);
          }, 1000);
        }
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  const handleBack = () => {
    navigate("/select-role");
  };

  return (
    <div>
      <Navbar />

      {/* Back Button */}
      <div className="container my-4">
        <button
          className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2"
          onClick={handleBack}
        >
          <i className="bi bi-arrow-left"></i> Back to Role Selection
        </button>
      </div>

      {/* Login Card */}
      <div className="container d-flex justify-content-center align-items-center min-vh-50">
        <div className="col-md-6 col-lg-5 col-xl-4">
          <div className="card shadow p-4 rounded-4 border-0">
            <div className="card-body">
              <h4 className="fw-bold text-center mb-4">Sign In</h4>

              {role && (
                <p className="text-muted small text-center mb-3">
                  You're logging in as <strong>{role}</strong>
                </p>
              )}

              {message && <div className="alert alert-info">{message}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
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

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <button type="submit" className="btn btn-primary w-50">
                    Sign In
                  </button>
                  <Link to="/forgot-password" className="small text-decoration-none">
                    Forgot password?
                  </Link>
                </div>
              </form>

              <hr className="my-3" />

              <p className="text-center small text-muted mb-0">
                Don't have an account?{" "}
                <Link to="/register" className="fw-semibold text-decoration-none">
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center text-muted mt-4 small">
            © {new Date().getFullYear()} RecruitPro. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
