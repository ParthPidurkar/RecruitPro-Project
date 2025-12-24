// src/context/AppliedJobsContext.js
import React, { createContext, useContext, useState } from 'react';

const AppliedJobsContext = createContext();

export const AppliedJobsProvider = ({ children }) => {
  const [appliedJobs, setAppliedJobs] = useState(() => {
    // Load from localStorage (optional)
    const stored = localStorage.getItem('appliedJobs');
    return stored ? JSON.parse(stored) : [];
  });

  const applyToJob = (job) => {
    if (!appliedJobs.find(j => j.id === job.id)) {
      const updated = [...appliedJobs, job];
      setAppliedJobs(updated);
      localStorage.setItem('appliedJobs', JSON.stringify(updated));
    }
  };

  return (
    <AppliedJobsContext.Provider value={{ appliedJobs, applyToJob }}>
      {children}
    </AppliedJobsContext.Provider>
  );
};

export const useAppliedJobs = () => useContext(AppliedJobsContext);
