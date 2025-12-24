// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SelectRole from "./components/Authentication/SelectRole";
// import Login from "./components/Authentication/Login";
// import Register from "./components/Authentication/Register";
// import Home from "./Pages/Home";
// import AdminProfile from './components/Admin/AdminProfile'; 
// import ForgotPassword from "./components/Authentication/ForgotPassword";
// import ResetPassword from "./components/Authentication/ResetPassword";
// import ProfileForm from './components/User/ProfileForm';



// // Dashboards
// import JobSeekerDashboard from "./components/User/UserDashboard";
// import RecruiterDashboard from "./components/Recruiter/RecruiterDashboard";
// import AdminDashboard from "./components/Admin/AdminDashboard";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/select-role" element={<SelectRole />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/admin-profile" element={<AdminProfile />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password/:token" element={<ResetPassword />} />
//         {/* Dashboard Routes */}
//         <Route path="/dashboard/jobseeker" element={<JobSeekerDashboard />} />
//         <Route path="/dashboard/recruiter" element={<RecruiterDashboard />} />
//         <Route path="/dashboard/admin" element={<AdminDashboard />} />
//         {/* Recruiter Nested Routes */}
//         <Route path="/dashboard/recruiter/*" element={<RecruiterDashboard />} />
//         <Route path="/profile" element={<ProfileForm />} />
        
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SelectRole from "./components/Authentication/SelectRole";
// import Login from "./components/Authentication/Login";
// import Register from "./components/Authentication/Register";
// import Home from "./Pages/Home";
// import Employers from "./Pages/Employers";
// import JobSeekers from "./Pages/JobSeekers";
// import FAQs from "./Pages/FAQs";
// import Testimonials from "./Pages/Testimonials";
// import Contact from "./Pages/Contact";
// import AdminProfile from './components/Admin/AdminProfile';
// import ProfileForm from './components/User/ProfileForm';
// import ForgotPassword from "./components/Authentication/ForgotPassword";
// import ResetPassword from "./components/Authentication/ResetPassword";

// // Dashboards
// import JobSeekerDashboard from "./components/User/UserDashboard";
// import RecruiterDashboard from "./components/Recruiter/RecruiterDashboard";
// import AdminDashboard from "./components/Admin/AdminDashboard";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/faqs" element={<FAQs />} />
//         <Route path="/testimonials" element={<Testimonials />} />
//         <Route path="/employers" element={<Employers />} />
//         <Route path="/jobseekers" element={<JobSeekers />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/select-role" element={<SelectRole />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/admin-profile" element={<AdminProfile />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password/:token" element={<ResetPassword />} />
        
//         {/* Dashboard Routes */}
//         <Route path="/dashboard/jobseeker" element={<JobSeekerDashboard />} />
//         <Route path="/dashboard/recruiter" element={<RecruiterDashboard />} />
//         <Route path="/dashboard/admin" element={<AdminDashboard />} />
//         <Route path="/dashboard/recruiter/*" element={<RecruiterDashboard />} />
        
//         <Route path="/profile" element={<ProfileForm />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// General Pages
import Home from "./Pages/Home";
import Employers from "./Pages/Employers";
import JobSeekers from "./Pages/JobSeekers";
import FAQs from "./Pages/FAQs";
import Testimonials from "./Pages/Testimonials";
import Contact from "./Pages/Contact";

// Authentication
import SelectRole from "./components/Authentication/SelectRole";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import ResetPassword from "./components/Authentication/ResetPassword";

// Dashboards
import JobSeekerDashboard from "./components/User/UserDashboard";
import RecruiterDashboard from "./components/Recruiter/RecruiterDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";

// Profiles
import ProfileForm from "./components/User/ProfileForm";
import AdminProfile from "./components/Admin/AdminProfile";

// Context Provider for Job Applications
import { AppliedJobsProvider } from "./components/User/AppliedJobsContext";





function App() {
  return (
    <AppliedJobsProvider>
      <Router>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/employers" element={<Employers />} />
          <Route path="/jobseekers" element={<JobSeekers />} />
          <Route path="/contact" element={<Contact />} />

          {/* Authentication Routes */}
          <Route path="/select-role" element={<SelectRole />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Admin Routes */}
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />

          {/* Recruiter Routes */}
          <Route path="/dashboard/recruiter" element={<RecruiterDashboard />} />
          <Route path="/dashboard/recruiter/*" element={<RecruiterDashboard />} />

          {/* Job Seeker Routes */}
          <Route path="/dashboard/jobseeker" element={<JobSeekerDashboard />} />
          <Route path="/profile" element={<ProfileForm />} />

        </Routes>
      </Router>
    </AppliedJobsProvider>
  );
}

export default App;

