import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const JobSeekers = () => {
  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <h2 className="text-primary fw-bold mb-4">Build Your Career with RecruitPro</h2>
        <p className="text-muted fs-5 mb-4">
          RecruitPro connects job seekers to opportunities that match their skills, goals, and passion.
          Whether you're fresh out of college or a seasoned professional, our platform is designed to
          simplify your job search and help you land your dream role.
        </p>

        <h4 className="fw-bold mt-5 mb-3 text-dark">What You Can Do as a Job Seeker</h4>
        <ul className="list-group list-group-flush fs-6 mb-4">
          <li className="list-group-item">
            ✅ <strong>Create a Powerful Profile:</strong> Showcase your skills, experience, certifications, and achievements in a professional format.
          </li>
          <li className="list-group-item">
            ✅ <strong>Explore Verified Jobs:</strong> Discover thousands of openings from trusted employers across various industries.
          </li>
          <li className="list-group-item">
            ✅ <strong>Get Job Alerts:</strong> Never miss an opportunity with real-time notifications based on your preferences.
          </li>
          <li className="list-group-item">
            ✅ <strong>Track Your Applications:</strong> See the status of each job you apply for and communicate directly with recruiters.
          </li>
        </ul>

        <div className="alert alert-success mt-4">
          <strong>Start your job search today!</strong> Sign up and let your next opportunity find you.
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobSeekers;
