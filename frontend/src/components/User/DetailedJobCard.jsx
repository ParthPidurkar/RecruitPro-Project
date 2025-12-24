import React from 'react';
import axios from 'axios';
import meeshoLogo from './img/Meesho_logo.png'; // Placeholder

const DetailedJobCard = ({ job, jobSeekerId }) => {
  const handleApply = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/applications', {
        jobId: job.id,
        jobSeekerId: jobSeekerId, // You must pass this prop from parent
      });
      alert('Applied successfully!');
    } catch (error) {
      console.error('Error applying to job:', error);
      alert('Failed to apply to job.');
    }
  };

  return (
    <div className="card mb-3 job-card-detailed">
      <div className="card-body">
        <div className="row">
          <div className="col-md-9">
            <h5 className="card-title mb-1">{job.title}</h5>
            <div className="d-flex flex-wrap align-items-center text-muted small mb-2">
              <span className="me-3"><i className="bi bi-briefcase me-1"></i>{job.experience}</span>
              <span className="me-3"><i className="bi bi-cash-stack me-1"></i>{job.salary}</span>
              <span><i className="bi bi-geo-alt me-1"></i>{job.location}</span>
            </div>
            <div className="d-flex flex-wrap align-items-center text-muted small mb-2">
              <span className="me-3"><i className="bi bi-code-slash me-1"></i>{job.skills}</span>
              {job.education && <span><i className="bi bi-mortarboard me-1"></i>{job.education}</span>}
            </div>
            <p className="card-text text-muted small">
              <i className="bi bi-clock me-1"></i>{job.postedDate}
            </p>
          </div>
          <div className="col-md-3 text-md-end">
            <img src={job.logo || meeshoLogo} alt={`${job.company} logo`} style={{ width: '50px', height: '50px', marginBottom: '0.5rem', objectFit: 'contain' }} />
            <h6 className="mb-1">{job.company}</h6>
            <button className="btn btn-primary btn-sm mt-1 w-100" onClick={handleApply}>Apply</button>
          </div>
        </div>
        <hr className="my-2" />
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <button className="btn btn-sm btn-link text-muted text-decoration-none">
              <i className="bi bi-bookmark me-1"></i>Save
            </button>
          </div>
          <div>
            <button className="btn btn-sm btn-link text-primary text-decoration-none">
              <i className="bi bi-eye me-1"></i>View details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedJobCard;
