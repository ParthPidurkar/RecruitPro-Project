import React, { useState, useEffect, useRef } from 'react';
import AppNavbar from './Navbar';
import ProfilePopup from './ProfilePopup.jsx';
import FilterSidebar from './FilterSidebar';
import RecommendedJobCard from './RecommendedJobCard';
import DetailedJobCard from './DetailedJobCard';
import Pagination from './Pagination.jsx';
import { getAllJobs, getCurrentUser } from './api.js';

const JobSeekerDashboard = () => {
  const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: 'Job Seeker', email: '', imageUrl: null });

  const [appliedJobs, setAppliedJobs] = useState(() => {
    const stored = localStorage.getItem('appliedJobs');
    return stored ? JSON.parse(stored) : [];
  });

  const [recommendedJobsData, setRecommendedJobsData] = useState([]);
  const [detailedJobsData, setDetailedJobsData] = useState([]);
  const [viewApplied, setViewApplied] = useState(false);

  const profilePopupRef = useRef(null);
  const profileIconRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const totalDetailedJobs = detailedJobsData.length;
  const totalPages = Math.ceil(totalDetailedJobs / jobsPerPage);

  const handleProfileClick = (event) => {
    event.stopPropagation();
    setProfilePopupOpen(prev => !prev);
  };

  const handleApply = (job) => {
    if (!appliedJobs.find(j => j.id === job.id)) {
      const updated = [...appliedJobs, job];
      setAppliedJobs(updated);
      localStorage.setItem('appliedJobs', JSON.stringify(updated));
    }
    setViewApplied(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profilePopupRef.current &&
        !profilePopupRef.current.contains(event.target) &&
        profileIconRef.current &&
        !profileIconRef.current.contains(event.target) &&
        !(event.target.closest('.nav-link.btn.btn-link'))
      ) {
        setProfilePopupOpen(false);
      }
    };

    if (isProfilePopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfilePopupOpen]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    const fetchJobsAndUser = async () => {
      try {
        const allJobs = await getAllJobs();
        setRecommendedJobsData(allJobs.slice(0, 5));
        setDetailedJobsData(allJobs);

        const user = await getCurrentUser();
        const storedName = localStorage.getItem('jobSeekerName');
        setCurrentUser({
          name: storedName || user.fullName || 'Job Seeker',
          email: user.email,
          imageUrl: null,
        });
      } catch (err) {
        console.error('Error fetching jobs or user info:', err);
      }
    };

    fetchJobsAndUser();
  }, []);

  const currentDetailedJobs = detailedJobsData.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

  return (
    <div>
      <AppNavbar
        onProfileClick={(e) => {
          if (profileIconRef.current) profileIconRef.current = e.currentTarget;
          handleProfileClick(e);
        }}
        isProfilePopupOpen={isProfilePopupOpen}
        user={currentUser}
      />

      {isProfilePopupOpen && (
        <div ref={profilePopupRef}>
          <ProfilePopup user={currentUser} onClose={() => setProfilePopupOpen(false)} />
        </div>
      )}

      <div className="container-fluid mt-4">
        <div className="row gx-4">
          <div className="col-lg-3 d-none d-lg-block">
            <FilterSidebar />
          </div>

          <div className="col-lg-9">
            <main>
              <div className="d-flex justify-content-between mb-3">
                <h4>{viewApplied ? 'Applied Jobs' : 'Recommendation Roles'}</h4>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => setViewApplied(!viewApplied)}
                >
                  {viewApplied ? 'View Recommendations' : 'View Applied Jobs'}
                </button>
              </div>

              {!viewApplied ? (
                <div className="horizontal-scroll-container row">
                  {recommendedJobsData.map(job => (
                    <div className="col-md-4 mb-3" key={job.id}>
                      <RecommendedJobCard job={job} applyToJobLocal={handleApply} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="row">
                  {appliedJobs.length === 0 ? (
                    <p className="text-muted">No jobs applied yet.</p>
                  ) : (
                    appliedJobs.map(job => (
                      <div className="col-md-4 mb-3" key={job.id}>
                        <div className="card p-3">
                          <h6>{job.title}</h6>
                          <p className="text-muted small">{job.company}</p>
                          <p className="text-success small">{job.salary}</p>
                          <p className="text-muted small">{job.location}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              <section className="mt-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="mb-0">Roles</h4>
                  <span className="text-muted small">
                    {(currentPage - 1) * jobsPerPage + 1} - {Math.min(currentPage * jobsPerPage, totalDetailedJobs)} of {totalDetailedJobs} Software Development Jobs
                  </span>
                </div>

                {currentDetailedJobs.map(job => (
                  <DetailedJobCard key={job.id} job={job} />
                ))}

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
