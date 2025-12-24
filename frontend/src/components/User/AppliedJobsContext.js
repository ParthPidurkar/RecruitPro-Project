import React, { createContext, useContext, useState } from "react";

const AppliedJobsContext = createContext();

export const AppliedJobsProvider = ({ children }) => {
  const [appliedJobs, setAppliedJobs] = useState(() => {
    const stored = localStorage.getItem("appliedJobs");
    return stored ? JSON.parse(stored) : [];
  });

  const addAppliedJob = (job) => {
    if (!appliedJobs.find(j => j.id === job.id)) {
      const updated = [...appliedJobs, job];
      setAppliedJobs(updated);
      localStorage.setItem("appliedJobs", JSON.stringify(updated));
    }
  };

  return (
    <AppliedJobsContext.Provider value={{ appliedJobs, addAppliedJob }}>
      {children}
    </AppliedJobsContext.Provider>
  );
};

export const useAppliedJobs = () => {
  const context = useContext(AppliedJobsContext);
  if (!context) {
    throw new Error("useAppliedJobs must be used within an AppliedJobsProvider");
  }
  return context;
};
