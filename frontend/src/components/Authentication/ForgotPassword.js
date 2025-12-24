import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/forgot-password", { email });

      const { token, message } = res.data;
      setSuccess(message || "Reset link sent. Redirecting...");
      setTimeout(() => {
        navigate(`/reset-password/${token}`, { state: { email } });
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-sm border-0 rounded-4 p-4">
              <div className="card-body">
                <h4 className="fw-bold mb-4 text-center">Reset Your Password</h4>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleReset}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="d-grid mt-3">
                    <button type="submit" className="btn btn-dark rounded-pill py-2">
                      Send Reset Link
                    </button>
                  </div>

                  <div className="text-center mt-3">
                    <small className="text-muted">
                      Done?{" "}
                      <Link to="/select-role" className="fw-semibold text-dark">
                        Back to Login
                      </Link>
                    </small>
                  </div>
                </form>
              </div>
            </div>

            <p className="text-center text-muted mt-4" style={{ fontSize: "0.9rem" }}>
              © {new Date().getFullYear()} RecruitPro. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
