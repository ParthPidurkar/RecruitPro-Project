import React from "react";
import "./Navbar.css";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/recruitproLogo.png";
import "./Navbar.css"; // ✅ Optional: custom styles

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4 py-2 shadow-sm sticky-top">
      <div className="container-fluid">
        {/* Logo + Brand */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="RecruitPro Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          RecruitPro
        </Link>

        {/* Toggle for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto align-items-lg-center gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active-nav text-white" : "nav-link text-white"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/employers"
              className={({ isActive }) =>
                isActive ? "nav-link active-nav text-white" : "nav-link text-white"
              }
            >
              Employers
            </NavLink>
            <NavLink
              to="/jobseekers"
              className={({ isActive }) =>
                isActive ? "nav-link active-nav text-white" : "nav-link text-white"
              }
            >
              Job Seekers
            </NavLink>
            <NavLink
              to="/faqs"
              className={({ isActive }) =>
                isActive ? "nav-link active-nav text-white" : "nav-link text-white"
              }
            >
              FAQs
            </NavLink>
            <NavLink
              to="/testimonials"
              className={({ isActive }) =>
                isActive ? "nav-link active-nav text-white" : "nav-link text-white"
              }
            >
              Testimonials
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "nav-link active-nav text-white" : "nav-link text-white"
              }
            >
              Contact
            </NavLink>

            <Link className="btn btn-light btn-sm mx-2 px-3 py-1" to="/select-role">
              Login
            </Link>
            <Link className="btn btn-outline-light btn-sm px-3 py-1" to="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
