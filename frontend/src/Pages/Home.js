// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/common/Navbar";
// import homeImage from "../assets/homeImage.jpg";
// import Footer from "../components/common/Footer";
// const Home = () => {
//   const navigate = useNavigate();

//   const handleGetStartClick = () => {
//     navigate("/select-role");
//   };

//   return (
//     <div>
//       {/* Reusable Navbar */}
//       <Navbar />

//       {/* Hero Section */}
//       <div
//         className="py-5"
//         style={{
//           background: "linear-gradient(to right, #e3f2fd, #ffffff)",
//           minHeight: "80vh",
//         }}
//       >
//         <div className="container">
//           <div className="row align-items-center">
//             {/* Text Content */}
//             <div className="col-md-6 mb-4">
//               <h1 className="display-5 fw-bold mb-3 text-primary">
//                 Revolutionize Recruitment
//               </h1>
//               <h4 className="text-secondary mb-3">
//                 Connect Employers with Talent
//               </h4>
//               <p className="text-muted mb-4">
//                 Streamline hiring, discover top professionals, and manage your recruitment lifecycle with confidence and ease using RecruitPro.
//               </p>
//               <button
//                 className="btn btn-primary btn-lg px-4 py-2"
//                 onClick={handleGetStartClick}
//               >
//                 Get Started
//               </button>
//             </div>

//             {/* Image */}
//             <div className="col-md-6 text-center">
//               <img
//                 src={homeImage}
//                 alt="Recruitment"
//                 className="img-fluid rounded shadow-sm"
//                 style={{ maxHeight: "450px", transition: "0.5s", transform: "scale(1.02)" }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//        <Footer />
//     </div>
//   );
// };

// export default Home;
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import homeImage from "../assets/homeImage.jpg";
import { FaCheckCircle, FaUserTie, FaBriefcase } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStartClick = () => {
    navigate("/select-role");
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(to right, #e3f2fd, #ffffff)",
          minHeight: "90vh",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            {/* Text Content */}
            <div className="col-md-6 mb-4">
              <h1 className="display-4 fw-bold text-primary mb-3">
                Revolutionize Your Hiring Journey
              </h1>
              <p className="lead text-secondary mb-3">
                Empowering recruiters and job seekers with a smarter, faster, and more reliable hiring experience.
              </p>
              <ul className="list-unstyled text-muted mb-4">
              <li className="mb-2">
                <FaCheckCircle className="text-success me-2" />
                Find the right people, not just any people.
              </li>
              <li className="mb-2">
                <FaCheckCircle className="text-success me-2" />
                Focus on hiring, not paperwork.
              </li>
              <li className="mb-2">
                <FaCheckCircle className="text-success me-2" />
                Conversations that move careers forward.
              </li>
            </ul>

              <button
                className="btn btn-lg btn-primary px-4 py-2 shadow"
                onClick={handleGetStartClick}
              >
                Get Started Now
              </button>
            </div>

            {/* Image */}
            <div className="col-md-6 text-center">
              <img
                src={homeImage}
                alt="Recruitment"
                className="img-fluid rounded shadow-lg animate__animated animate__zoomIn"
                style={{ maxHeight: "450px", transition: "0.5s", transform: "scale(1.03)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-4 text-dark">Why Choose RecruitPro?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 bg-white rounded shadow-sm h-100">
                <FaUserTie size={40} className="text-primary mb-3" />
                <h5 className="fw-bold">For Employers</h5>
                <p className="text-muted">
                  Post jobs, screen resumes, and hire candidates—all from one intuitive dashboard.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 bg-white rounded shadow-sm h-100">
                <FaBriefcase size={40} className="text-primary mb-3" />
                <h5 className="fw-bold">For Job Seekers</h5>
                <p className="text-muted">
                  Build your profile, search top jobs, and get hired by leading companies faster.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 bg-white rounded shadow-sm h-100">
                <FaCheckCircle size={40} className="text-primary mb-3" />
                <h5 className="fw-bold">Smart Matching</h5>
                <p className="text-muted">
                  We use intelligent algorithms to connect the right talent with the right job.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
