import React, { useState } from 'react';

const FilterSidebar = () => {
  const [isLocationExpanded, setLocationExpanded] = useState(true);
  const [isJobTitleExpanded, setJobTitleExpanded] = useState(true);

  const locations = ['Hydrabad', 'Pune', 'Chennai', 'Remote'];
  const jobTitles = ['Software Developer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer'];

  return (
    <div className="sidebar">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Filter Jobs</h5>
        <button className="btn btn-sm btn-link p-0">
          <i className="bi bi-chevron-left"></i> {/* Assuming this hides the sidebar */}
        </button>
      </div>

      {/* Location Filter */}
      <div className="filter-section">
        <div className="d-flex justify-content-between align-items-center mb-2" onClick={() => setLocationExpanded(!isLocationExpanded)} style={{cursor: 'pointer'}}>
          <h6><i className="bi bi-geo-alt me-2"></i>Location</h6>
          <i className={`bi bi-chevron-${isLocationExpanded ? 'up' : 'down'}`}></i>
        </div>
        {isLocationExpanded && (
          <>
            {locations.map(loc => (
              <div className="form-check mb-1" key={loc}>
                <input className="form-check-input" type="radio" name="locationFilter" id={`loc-${loc}`} />
                <label className="form-check-label" htmlFor={`loc-${loc}`}>
                  {loc}
                </label>
              </div>
            ))}
            <button className="btn btn-link btn-sm p-0 text-decoration-none">See all</button>
          </>
        )}
      </div>

      <hr />

      {/* Job Title Filter */}
      <div className="filter-section">
        <div className="d-flex justify-content-between align-items-center mb-2" onClick={() => setJobTitleExpanded(!isJobTitleExpanded)} style={{cursor: 'pointer'}}>
          <h6><i className="bi bi-briefcase me-2"></i>Job title</h6>
          <i className={`bi bi-chevron-${isJobTitleExpanded ? 'up' : 'down'}`}></i>
        </div>
        {isJobTitleExpanded && (
          <>
            {jobTitles.map(title => (
              <div className="form-check mb-1" key={title}>
                <input className="form-check-input" type="radio" name="jobTitleFilter" id={`job-${title.replace(/\s+/g, '')}`} />
                <label className="form-check-label" htmlFor={`job-${title.replace(/\s+/g, '')}`}>
                  {title}
                </label>
              </div>
            ))}
            <button className="btn btn-link btn-sm p-0 text-decoration-none">See all</button>
          </>
        )}
      </div>

      <button className="btn btn-outline-primary w-100 mt-3">Apply filter</button>
    </div>
  );
};

export default FilterSidebar;