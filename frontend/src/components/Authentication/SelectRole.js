// import React from "react";
// import { useNavigate } from "react-router-dom";

// const SelectRole = () => {
//   const navigate = useNavigate();

//   const handleRoleSelect = (role) => {
//     navigate(`/login?role=${role}`);
//   };

//   const handleBack = () => {
//     navigate("/");
//   };

//   return (
//     <div>
//       {/* Navbar */}
//       <nav className="navbar navbar-expand-lg navbar-primary bg-primary px-4">
//         <div className="container-fluid">
//           <span className="navbar-brand text-white fw-bold">RecruitPro</span>
//         </div>
//       </nav>

//       {/* Back Button */}
//       <div className="container my-4">
//         <button
//           className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2"
//           onClick={handleBack}
//         >
//           <i className="bi bi-arrow-left"></i> Back to Home
//         </button>
//       </div>

//       {/* Role selection card */}
//       <div className="container my-3">
//         <div
//           className="card p-5 mx-auto"
//           style={{ maxWidth: "700px", borderRadius: "15px" }}
//         >
//           <h3 className="text-center fw-bold mb-2">Hire Fast. Get Hired Faster.</h3>
//           <p className="text-center text-muted mb-4">
//             The bridge between recruiters and top talent.
//           </p>

//           <div className="d-flex justify-content-center gap-4 flex-wrap">
//             <button
//               onClick={() => handleRoleSelect("jobseeker")}
//               className="btn btn-light d-flex flex-column align-items-center px-5 py-4 mb-3"
//               style={{ minWidth: "180px", fontWeight: "600" }}
//             >
//               <i className="bi bi-people-fill fs-2 mb-3 text-primary"></i>
//               Join as <strong>Job Seeker</strong>
//             </button>

//             <button
//               onClick={() => handleRoleSelect("recruiter")}
//               className="btn btn-light d-flex flex-column align-items-center px-5 py-4 mb-3"
//               style={{ minWidth: "180px", fontWeight: "600" }}
//             >
//               <i className="bi bi-person-badge-fill fs-2 mb-3 text-primary"></i>
//               Join as <strong>Recruiter</strong>
//             </button>

//             <button
//               onClick={() => handleRoleSelect("admin")}
//               className="btn btn-light d-flex flex-column align-items-center px-5 py-4 mb-3"
//               style={{ minWidth: "180px", fontWeight: "600" }}
//             >
//               <i className="bi bi-person-fill-gear fs-2 mb-3 text-primary"></i>
//               Join as <strong>Admin</strong>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SelectRole;

import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar"; 

const SelectRole = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate(`/login?role=${role}`);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div>
      {/* Shared Navbar */}
      <Navbar />

      {/* Back Button */}
      <div className="container my-4">
        <button
          className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2"
          onClick={handleBack}
        >
          <i className="bi bi-arrow-left"></i> Back to Home
        </button>
      </div>

      {/* Role selection card */}
      <div className="container my-3">
        <div
          className="card p-5 mx-auto"
          style={{ maxWidth: "700px", borderRadius: "15px" }}
        >
          <h3 className="text-center fw-bold mb-2">Hire Fast. Get Hired Faster.</h3>
          <p className="text-center text-muted mb-4">
            The bridge between recruiters and top talent.
          </p>

          <div className="d-flex justify-content-center gap-4 flex-wrap">
            <button
              onClick={() => handleRoleSelect("jobseeker")}
              className="btn btn-light d-flex flex-column align-items-center px-5 py-4 mb-3"
              style={{ minWidth: "180px", fontWeight: "600" }}
            >
              <i className="bi bi-people-fill fs-2 mb-3 text-primary"></i>
              Join as <strong>Job Seeker</strong>
            </button>

            <button
              onClick={() => handleRoleSelect("recruiter")}
              className="btn btn-light d-flex flex-column align-items-center px-5 py-4 mb-3"
              style={{ minWidth: "180px", fontWeight: "600" }}
            >
              <i className="bi bi-person-badge-fill fs-2 mb-3 text-primary"></i>
              Join as <strong>Recruiter</strong>
            </button>

            <button
              onClick={() => handleRoleSelect("admin")}
              className="btn btn-light d-flex flex-column align-items-center px-5 py-4 mb-3"
              style={{ minWidth: "180px", fontWeight: "600" }}
            >
              <i className="bi bi-person-fill-gear fs-2 mb-3 text-primary"></i>
              Join as <strong>Admin</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectRole;
