

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../common/Navbar";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", {
        email,
        password,
        userType,
      });

      if (res.status === 200 || res.status === 201) {
        setMessage("✅ Registration successful. Redirecting to login...");
        setTimeout(() => navigate("/select-role"), 2000);
      }
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      setMessage(
        err.response?.data?.message || "❌ Registration failed. Try again."
      );
    }
  };

  return (
    <div>
      <Navbar />

      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div
          className="card p-5"
          style={{
            maxWidth: "450px",
            width: "100%",
            borderRadius: "15px",
            boxShadow: "0 0 15px rgba(0,0,0,0.1)",
          }}
        >
          <h4 className="mb-4 fw-bold">Sign up</h4>

          {message && <div className="alert alert-info p-2">{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label small">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control form-control-sm"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label small">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control form-control-sm"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="userType" className="form-label small">
                User type
              </label>
              <select
                id="userType"
                className="form-select form-select-sm"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select user type
                </option>
                <option value="jobseeker">Job Seeker</option>
                <option value="recruiter">Recruiter</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <button type="submit" className="btn btn-primary btn-sm">
                Sign up
              </button>
              <Link to="/forgot-password" className="small">
                Forgot password
              </Link>
            </div>
          </form>

          <p className="small text-center text-muted mt-4">
            Already have an account?{" "}
            <Link to="/select-role" className="text-decoration-none">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
