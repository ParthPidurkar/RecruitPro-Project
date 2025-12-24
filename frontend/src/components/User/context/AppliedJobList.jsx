import React from 'react';
import { useAppliedJobs } from './AppliedJobsContext';

const AppliedJobList = () => {
  const { appliedJobs } = useAppliedJobs();

  return (
    <div className="container mt-4">
      <h4>Applied Jobs</h4>
      {appliedJobs.length === 0 ? (
        <p className="text-muted">No jobs applied yet.</p>
      ) : (
        <div className="row">
          {appliedJobs.map(job => (
            <div key={job.id} className="col-md-4 mb-3">
              <div className="card p-3">
                <h6>{job.title}</h6>
                <p className="text-muted small">{job.company}</p>
                <p className="text-success small">{job.salary}</p>
                <p className="text-muted small">{job.location}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobList;
