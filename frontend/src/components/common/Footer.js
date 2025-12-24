import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-4 pb-2 mt-auto">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* RecruitPro Info */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold text-uppercase">RecruitPro</h5>
            <p className="small">
              Streamline hiring, connect with top talent, and manage your recruitment lifecycle all in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled small">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/features" className="text-light text-decoration-none">Features</Link></li>
              <li><Link to="/select-role" className="text-light text-decoration-none">Login/Register</Link></li>
              <li><Link to="/contact" className="text-light text-decoration-none">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Contact Us</h6>
            <p className="small mb-1">📧 support@recruitpro.com</p>
            <p className="small mb-1">📞 +91 9518559175</p>
            <p className="small">🏢 Bengaluru, Karnataka, India</p>
          </div>
        </div>
        <hr className="" />
        <p className="text-center small text-muted mb-0">
          © {new Date().getFullYear()} RecruitPro. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
