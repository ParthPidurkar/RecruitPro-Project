import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../Recruiter/components/Sidebar';
import CompanyProfile from '../Recruiter/pages/CompanyProfile';
import AboutMe from '../Recruiter/pages/AboutMe';
import JobDashboard from '../Recruiter/pages/JobDashboard';
import Navbar from '../common/Navbar';
import axios from 'axios';

const RecruiterDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 80 : 260;



  // ABOUT COMPANY API
 const [companyData, setCompanyData] = useState({
    name: 'NET APP',
    logo: '/companyLogo.png',
    about:'Tech Solutions is a cutting-edge IT firm specializing in web development, cloud services, and AI solutions. We are dedicated to delivering innovative products that help businesses scale.',
    email: 'contact@techsolutions.com',
    phone: '+91 9876543210',
    founded: '2012',
    industry: 'Information Technology',
    size: '201-500 employees',
    city: 'Bangalore',
    country: 'India',
    website: 'https://techsolutions.com',
    linkedin: 'https://linkedin.com/company/techsolutions',
    twitter: 'https://twitter.com/techsolutions',
  });

  // ABOUT ME API
  const [profile, setProfile] = useState({
    name: 'Abhishek Singh',
    photo: '/image.png',
    email: 'abhishek@example.com',
    contact: '+91 9876543210',
    experience: '3 Years',
    role: 'Recruiter',
    portfolio: 'https://yourportfolio.com',
    linkedin: 'https://linkedin.com/in/yourprofile',
    github: 'https://github.com/yourprofile',
    twitter: 'https://twitter.com/yourprofile',
   
  });

    // JOB DASHBOARD API
   const [jobs, setJobs] = useState([
  {
    jobID: "01",
    role: "Software Developer",
    jobType: "Fulltime",
    location: "Remote",
    salary: "20k - 50k",
    skills: "HTML, CSS, JS",
    dateOfPost: "01/12/2025",
    deadline: "10/12/2025",
    postStatus: "Open",
    approval: "Approved",
    jobDescription: "Frontend developer job",
    postedBy: {
      name: "Aman Kumar",
      email: "aman.kumar@example.com",
      contact: "+91 9988776655",
      portfolio: "https://portfolio.amankumar.dev",
      social: "https://linkedin.com/in/aman-kumar"
    },
    applicants: [
      {
        applicantID: "01-1",
        appliedDate: "02/12/2025",
        name: "Rahul Mehta",
        email: "rahul@example.com",
        contact: "+91 9998887771",
        skills: "HTML, CSS",
        yeo: "1",
        selectionStatus: "No Action",
        resume: "/myResume.pdf",
        description: "Interested in frontend dev"
      },
      {
        applicantID: "01-2",
        appliedDate: "03/12/2025",
        name: "Sneha Roy",
        email: "sneha@example.com",
        contact: "+91 9998887772",
        skills: "JS, React",
        yeo: "2",
        selectionStatus: "No Action",
        resume: "/myResume.pdf",
        description: "React experience"
      },
      {
        applicantID: "01-3",
        appliedDate: "04/12/2025",
        name: "Arjun Das",
        email: "arjun@example.com",
        contact: "+91 9998887773",
        skills: "Node.js",
        yeo: "3",
        selectionStatus: "No Action",
        resume: "/myResume.pdf",
        description: "Fullstack capable"
      }
    ]
  },
  // {
  //   jobID: "02",
  //   role: "UI/UX Designer",
  //   jobType: "Part-time",
  //   location: "Bangalore",
  //   salary: "15k - 30k",
  //   skills: "Figma, Adobe XD, Sketch",
  //   dateOfPost: "03/12/2025",
  //   deadline: "15/12/2025",
  //   postStatus: "Open",
  //   approval: "Approved",
  //   jobDescription: "Creative designer role",
  //   postedBy: {
  //     name: "Priya Sharma",
  //     email: "priya.sharma@example.com",
  //     contact: "+91 9988123123",
  //     portfolio: "https://portfolio.priya.design",
  //     social: "https://linkedin.com/in/priyasharma"
  //   },
  //   applicants: [
  //     {
  //       applicantID: "02-1",
  //       appliedDate: "04/12/2025",
  //       name: "Divya Kapoor",
  //       email: "divya@example.com",
  //       contact: "+91 9998887774",
  //       skills: "Figma",
  //       yeo: "1",
  //       selectionStatus: "No Action",
  //       resume: "/myResume.pdf",
  //       description: "UI focus"
  //     },
  //     {
  //       applicantID: "02-2",
  //       appliedDate: "05/12/2025",
  //       name: "Ishaan Malik",
  //       email: "ishaan@example.com",
  //       contact: "+91 9998887775",
  //       skills: "Adobe XD",
  //       yeo: "2",
  //       selectionStatus: "No Action",
  //       resume: "/myResume.pdf",
  //       description: "UX and research"
  //     },
  //     {
  //       applicantID: "02-3",
  //       appliedDate: "06/12/2025",
  //       name: "Kavita Sen",
  //       email: "kavita@example.com",
  //       contact: "+91 9998887776",
  //       skills: "Sketch, Figma",
  //       yeo: "1.5",
  //       selectionStatus: "No Action",
  //       resume: "/myResume.pdf",
  //       description: "Freelancer background"
  //     }
  //   ]
  // },
  // {
  //   jobID: "03",
  //   role: "Data Analyst",
  //   jobType: "Internship",
  //   location: "Mumbai",
  //   salary: "10k - 15k",
  //   skills: "Python, SQL, Excel",
  //   dateOfPost: "05/12/2025",
  //   deadline: "20/12/2025",
  //   postStatus: "Open",
  //   approval: "Pending",
  //   jobDescription: "Internship role for data work",
  //   postedBy: {
  //     name: "Ravi Verma",
  //     email: "ravi.verma@example.com",
  //     contact: "+91 8877665544",
  //     portfolio: "https://portfolio.raviverma.dev",
  //     social: "https://linkedin.com/in/raviverma"
  //   },
  //   applicants: [
  //     {
  //       applicantID: "03-1",
  //       appliedDate: "06/12/2025",
  //       name: "Anjali Reddy",
  //       email: "anjali@example.com",
  //       contact: "+91 9998887777",
  //       skills: "Excel, Python",
  //       yeo: "0",
  //       selectionStatus: "No Action",
  //       resume: "/myResume.pdf",
  //       description: "Looking for data internship"
  //     },
  //     {
  //       applicantID: "03-2",
  //       appliedDate: "07/12/2025",
  //       name: "Mohit Jain",
  //       email: "mohit@example.com",
  //       contact: "+91 9998887778",
  //       skills: "SQL, Tableau",
  //       yeo: "1",
  //       selectionStatus: "No Action",
  //       resume: "/myResume.pdf",
  //       description: "SQL and dashboarding"
  //     },
  //     {
  //       applicantID: "03-3",
  //       appliedDate: "08/12/2025",
  //       name: "Sara Khan",
  //       email: "sara@example.com",
  //       contact: "+91 9998887779",
  //       skills: "Python, ML",
  //       yeo: "1.5",
  //       selectionStatus: "No Action",
  //       resume: "/myResume.pdf",
  //       description: "Interested in AI/ML"
  //     }
  //   ]
  // }
]

);



  return (
         <>
     <Navbar />
    <div
      className="mx-auto "
      style={{
        maxWidth: '1440px',
        width: '100%',
        minHeight: '100vh',
        margin: '0 auto',
        display: 'flex',
        gap:'15px',
        transition: 'all 0.3s ease',
      }}
    >
    
      {/* Sidebar */}
      <div
        style={{
          width: sidebarWidth,
          backgroundColor: '#f8f9fa',
          borderRight: '1px solid #dee2e6',
          transition: 'width 0.3s ease',
        }}
      >
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} companyData={companyData}  />
      </div>

      
      <div 
      
        style={{
          width: `calc(100% - ${sidebarWidth}px)`,
          padding: '2rem',
          transition: 'width 0.3s ease',
        }}
      >
        <Routes>
          <Route path="/" element={<CompanyProfile companyData={companyData} setCompanyData={setCompanyData}/>} />
          <Route path="/about" element={<AboutMe profile={profile} setProfile={setProfile}/>} />
          <Route path="/jobdashboard" element={<JobDashboard jobs={jobs} setJobs={setJobs} />} />
        </Routes>
      </div>
    </div>

    </>
  );
};

export default RecruiterDashboard;
