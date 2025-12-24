import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/api/auth/reset-password/${token}`,
        { password }
      );
      setSuccess(response.data.message || "Password reset successfully. Redirecting to login...");
      setTimeout(() => navigate("/select-role"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid or expired token. Please request a new password reset link."
      );
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-sm border-0 rounded-4 p-4">
              <div className="card-body">
                <h4 className="fw-bold text-center mb-4">Set New Password</h4>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="d-grid mt-3">
                    <button
                      type="submit"
                      className="btn btn-dark rounded-pill py-2"
                    >
                      Reset Password
                    </button>
                  </div>
                </form>

                <div className="text-center mt-4">
                  <small className="text-muted">
                    Remembered your password?{" "}
                    <a href="/select-role" className="text-decoration-none fw-semibold">
                      Go to Login
                    </a>
                  </small>
                </div>
              </div>
            </div>

            <p className="text-center text-muted mt-4 small">
              © {new Date().getFullYear()} RecruitPro. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
