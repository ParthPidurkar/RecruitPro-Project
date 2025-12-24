import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const Testimonials = () => {
  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <h2 className="text-primary fw-bold mb-5 text-center">What Our Users Say</h2>

        <div className="row g-4">
          {/* Testimonial 1 */}
          <div className="col-md-4">
            <div className="p-4 bg-light rounded shadow-sm h-100">
              <p className="text-muted fst-italic">
                “RecruitPro made it so easy to find the right candidate for our tech team. We hired within a week!”
              </p>
              <h6 className="fw-bold mb-0">— Ankit Sharma, HR Manager at TechLoop</h6>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="col-md-4">
            <div className="p-4 bg-light rounded shadow-sm h-100">
              <p className="text-muted fst-italic">
                “As a fresher, I was overwhelmed with where to start. RecruitPro helped me build a profile and apply to great companies.”
              </p>
              <h6 className="fw-bold mb-0">— Neha Verma, Front-End Developer</h6>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="col-md-4">
            <div className="p-4 bg-light rounded shadow-sm h-100">
              <p className="text-muted fst-italic">
                “We love the built-in scheduling and tracking tools. It saves hours of manual follow-up.”
              </p>
              <h6 className="fw-bold mb-0">— Rohan Mehta, Recruitment Lead at BlueSkye</h6>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <p className="text-muted">
            Join thousands of satisfied users and simplify your recruitment journey today.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Testimonials;
