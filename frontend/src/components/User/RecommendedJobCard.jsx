import React from "react";
import { useAppliedJobs } from "./AppliedJobsContext";

const RecommendedJobCard = ({ job }) => {
  const { appliedJobs, addAppliedJob } = useAppliedJobs();

  const isApplied = appliedJobs.some(j => j.id === job.id);

  return (
    <div className="card shadow p-3 h-100">
      <div className="card-body">
        <h6>{job.title}</h6>
        <p className="text-muted small">{job.company}</p>
        <p className="text-success small">{job.salary}</p>
        <p className="text-muted small">{job.location}</p>
        <button
          className="btn btn-primary btn-sm w-100"
          disabled={isApplied}
          onClick={() => addAppliedJob(job)}
        >
          {isApplied ? "Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
};

export default RecommendedJobCard;
