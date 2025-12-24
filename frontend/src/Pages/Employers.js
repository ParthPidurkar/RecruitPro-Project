import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const Employers = () => {
  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <h2 className="text-primary fw-bold mb-4">Hire Smarter with RecruitPro</h2>
        <p className="text-muted fs-5 mb-4">
          At RecruitPro, we empower businesses of all sizes to discover top-tier talent quickly and efficiently.
          Whether you're a startup, enterprise, or staffing agency, our intelligent recruitment tools
          streamline the entire hiring lifecycle—so you can focus on what matters most: building your team.
        </p>

        <h4 className="fw-bold mt-5 mb-3 text-dark">Why RecruitPro for Employers?</h4>
        <ul className="list-group list-group-flush fs-6 mb-4">
          <li className="list-group-item">
            ✅ <strong>Post Jobs Effortlessly:</strong> Publish vacancies in just a few clicks and reach thousands of candidates across multiple job boards.
          </li>
          <li className="list-group-item">
            ✅ <strong>Smart Resume Filtering:</strong> Our AI analyzes candidate profiles to deliver the best matches, saving your time and improving hire quality.
          </li>
          <li className="list-group-item">
            ✅ <strong>Collaboration Tools:</strong> Invite team members, leave notes, and track feedback—all from a unified dashboard.
          </li>
          <li className="list-group-item">
            ✅ <strong>Analytics & Reporting:</strong> Track job post performance, application rates, and time-to-hire metrics with built-in analytics.
          </li>
        </ul>

        <div className="alert alert-primary mt-4">
          <strong>Ready to hire?</strong> Create your employer account and start attracting candidates today.
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Employers;
