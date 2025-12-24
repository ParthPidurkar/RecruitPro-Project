import React, { useState } from 'react';
import { Modal, Button, Table, Form, Alert } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaGlobe, FaLinkedin } from 'react-icons/fa';

const JobDashboard = ({jobs, setJobs}) => {
 

  // Modal & State Handling
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newJob, setNewJob] = useState({
    role: "", 
    jobType: "", 
    location: "", 
    salary: "", 
    skills: "", 
    deadline: "", 
    jobDescription: "",
    
      postedBy: { name: "", email: "", contact: "", portfolio: "", social: "" },
      postStatus: "Open", approval: "Pending",
      dateOfPost: new Date().toLocaleDateString(),
    applicants: []
  });
  
  //-==================================
  const [selectedApplicants, setSelectedApplicants] = useState([]);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showApplicantDetailModal, setShowApplicantDetailModal] = useState(false);
  const [recruiterInfo, setRecruiterInfo] = useState(null);
  const [showRecruiterModal, setShowRecruiterModal] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);

  // Filters
  const [filterLocation, setFilterLocation] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterType, setFilterType] = useState('');

  const handleCreatePostJob = async() => {
    // setJobs([...jobs, { ...newJob, jobID: String(jobs.length + 1).padStart(2, "0") }]);
    // setShowCreateModal(false);
    
    //setNewJob({ ...newJob, role: "", jobType: "", location: "", salary: "", skills: "", deadline: "", jobDescription: "", postedBy: { name: "", email: "", contact: "", portfolio: "", social: "" } });
    
    const newJobData = {
      ...newJob,
      jobID: String(jobs.length + 1).padStart(2, "0"),
    }
      const { role, jobType, location, salary, skills, deadline, jobDescription, postedBy } = newJobData;
      if (
          !role.trim()|| !jobType.trim()|| !location.trim()|| !salary.trim()|| !skills.trim()|| !deadline.trim()|| !jobDescription.trim() 
          || !postedBy.name.trim() || !postedBy.email.trim() || !postedBy.contact.trim() ) 
        {
          setShowValidationError(true);
          // showAlert("Error", "Please fill all the fields");
          return;
        }

        setShowValidationError(false);
      try {

        //   const response = await fetch("http://localhost:8080/api/recruiter/send_invite", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(newJobData),
        // });
        const response = await axios.post("http://localhost:8080/api/recruiter/create_job", newJobData);
        console.log("Job created on backend:", response.data);

        // Update frontend state
        setJobs([...jobs, newJobData]);

        // Close modal
        setShowCreateModal(false);

        // Reset form
        setNewJob({
          ...newJob,
          role: "",
          jobType: "",
          location: "",
          salary: "",
          skills: "",
          deadline: "",
          jobDescription: "",
          postedBy: {
            name: "",
            email: "",
            contact: "",
            portfolio: "",
            social: ""
          }
        });
      } catch (error) {
        console.error("Error creating job:", error);
        alert("Failed to create job. Please try again.");
      }
  };
  
  //==================
  const handleDeleteJob = (jobID) => setJobs(jobs.filter(job => job.jobID !== jobID));

  const handleViewApplicants = (applicants) => {
    setSelectedApplicants(applicants);
    setShowApplicantsModal(true);
  };

  const handleApplicantDetail = (applicant) => {
    setSelectedApplicant(applicant);
    setShowApplicantDetailModal(true);
  };

  const handleRecruiterInfo = (info) => {
    setRecruiterInfo(info);
    setShowRecruiterModal(true);
  };

  //------------- EMAIL SENDING AUTOMATED ----------------------

   
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [messageData, setMessageData] = useState({
      recruiterMail:"",
      fullName: "",
      email: "",
      subject: "",
      meetLink: "",
      time: ""
    });


  const handleSend = async () => {
  const { recruiterMail, fullName, email, subject, meetLink, time } = messageData;

  if (
    !recruiterMail.trim() ||
    !fullName.trim() ||
    !email.trim() ||
    !subject.trim() ||
    !meetLink.trim() ||
    !time.trim()
  ) {
    setShowValidationError(true);
    return;
  }

  setShowValidationError(false);

  try {
    const response = await fetch("http://localhost:8080/api/recruiter/send_invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    });

    if (response.ok) {
      const text = await response.text(); // You’re not using this `text`, so can omit
      setShowMessageModal(false);
      alert(text || "Data sent successfully");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    } else {
      const errorText = await response.text();
      alert(errorText || "Failed to send invite.");
    }
  } catch (error) {
    console.error("Error sending message:", error);
    alert("An error occurred while sending the message.");
  }
};
 

  const handleStatusChange = (status, applicantID) => 
  {
  const value = status;
     if (  value === "Interview") {
        setMessageData({
          recruiterMail:"",
          fullName:"",
          email: "",
          subject: "",
          meetLink: "",
          time: ""
        });
        setShowMessageModal(true);
      }



    const updatedJobs = jobs.map(job => ({
      ...job,
      applicants: job.applicants.map(app =>
        app.applicantID === applicantID ? { ...app, selectionStatus: status } : app
      )
    }));

    const updatedSelectedApplicants = selectedApplicants.map(app =>
      app.applicantID === applicantID ? { ...app, selectionStatus: status } : app
    );
    setJobs(updatedJobs);
    setSelectedApplicants(updatedSelectedApplicants);

  };


// Show the jobs on the basis of filter

  const filteredJobs = jobs.filter(job =>
    (filterLocation === '' || job.location.toLowerCase().includes(filterLocation.toLowerCase())) &&
    (filterRole === '' || job.role.toLowerCase().includes(filterRole.toLowerCase())) &&
    (filterType === '' || job.jobType.toLowerCase().includes(filterType.toLowerCase()))
  );

  return (
    
    <div className="container mt-2">
      <h3 className="mb-3">Job Dashboard</h3>
    
      {showAlert && (<div 
      className="alert alert-success text-center"
      role="alert"
      >
        Message sent successfully!
        </div>
      )}

      <hr/>
      <Button className='mt-1 mb-1 w-100' variant="primary" onClick={() => setShowCreateModal(true)}>Create New Job Post</Button>
        

      <hr/>  
     
      {/* Filter Controls */}
      <div className="d-flex gap-3 mt-4 mb-4 flex-wrap">
        <Form.Select
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          style={{ maxWidth: "200px" }}
        >
          <option value="">Filter by Location</option>
          {[...new Set(jobs.map(job => job.location))].map((loc, idx) => (
            <option key={idx} value={loc}>{loc}</option>
          ))}
        </Form.Select>

        <Form.Select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          style={{ maxWidth: "200px" }}
        >
          <option value="">Filter by Role</option>
          {[...new Set(jobs.map(job => job.role))].map((role, idx) => (
            <option key={idx} value={role}>{role}</option>
          ))}
        </Form.Select>

        <Form.Select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{ maxWidth: "200px" }}
        >
          <option value="">Filter by Type</option>
          {[...new Set(jobs.map(job => job.jobType))].map((type, idx) => (
            <option key={idx} value={type}>{type}</option>
          ))}
        </Form.Select>

        <Button variant="secondary" onClick={() => {
          setFilterLocation('');
          setFilterRole('');
          setFilterType('');
        }}>
          Clear Filters
        </Button>
      </div>

      <hr/> 
      <h4 className="mb-3 mt-4">Job Posted</h4>

      {/* Jobs Table */}
      <Table bordered responsive className=" text-nowrap w-auto">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Role</th>
            <th>Type</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Skills</th>
            <th>Post Date</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Approval</th>
            <th>Applicants</th>
            <th>Posted By</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.map((job, index) => (
            <tr key={job.jobID}>
              <td>{index + 1}</td>
              <td>{job.role}</td>
              <td>{job.jobType}</td>
              <td>{job.location}</td>
              <td>{job.salary}</td>
              <td>{job.skills}</td>
              <td>{job.dateOfPost}</td>
              <td>{job.deadline}</td>
             <td>
  <Form.Select
   
    value={job.postStatus ? job.postStatus : 'Open'}
    onChange={(e) => {
      const updatedJobs = [...jobs];
      const index = updatedJobs.findIndex(j => j.jobID === job.jobID);
      updatedJobs[index] = {
        ...updatedJobs[index],
        postStatus: e.target.value
      };
      setJobs(updatedJobs);
    }}
    size="sm"
  >
    <option value="Open">Open</option>
    <option value="Paused">Paused</option>
    <option value="Closed">Closed</option>
  </Form.Select>
</td>
              <td>{job.approval}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => handleViewApplicants(job.applicants)}>View</Button>
              </td>
              <td>
                <Button variant="secondary" size="sm" onClick={() => handleRecruiterInfo(job.postedBy)}>View</Button>
              </td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDeleteJob(job.jobID)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>



      {/* //////////MODELS//////// */}

      {/* Popup Create New Job  */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Job</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  value={newJob.role}
                  onChange={(e) => setNewJob({ ...newJob, role: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Job Type</Form.Label>
                <Form.Control
                  value={newJob.jobType}
                  onChange={(e) => setNewJob({ ...newJob, jobType: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  value={newJob.location}
                  onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Salary</Form.Label>
                <Form.Control
                  value={newJob.salary}
                  onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Skills</Form.Label>
                <Form.Control
                  value={newJob.skills}
                  onChange={(e) => setNewJob({ ...newJob, skills: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Deadline</Form.Label>
                <Form.Control
                  type="date"
                  value={newJob.deadline}
                  onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Job Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newJob.jobDescription}
                  onChange={(e) => setNewJob({ ...newJob, jobDescription: e.target.value })}
                />
              </Form.Group>

              <hr />
              <Form.Label>Posted By (Recruiter)</Form.Label>

              <Form.Group className="mb-3">
                <Form.Control
                  placeholder="Name"
                  value={newJob.postedBy.name}
                  onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      postedBy: { ...newJob.postedBy, name: e.target.value },
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  placeholder="Email"
                  value={newJob.postedBy.email}
                  onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      postedBy: { ...newJob.postedBy, email: e.target.value },
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  placeholder="Contact"
                  value={newJob.postedBy.contact}
                  onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      postedBy: { ...newJob.postedBy, contact: e.target.value },
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  placeholder="Portfolio URL"
                  value={newJob.postedBy.portfolio}
                  onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      postedBy: { ...newJob.postedBy, portfolio: e.target.value },
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  placeholder="Social URL"
                  value={newJob.postedBy.social}
                  onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      postedBy: { ...newJob.postedBy, social: e.target.value },
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          
          <Modal.Footer>
            <Button onClick={handleCreatePostJob}>Post Job</Button>
          </Modal.Footer>
      </Modal>


      {/* popup for All applicants  */}
      <Modal show={showApplicantsModal} onHide={() => setShowApplicantsModal(false)} size="lg">
        <Modal.Header closeButton><Modal.Title>Applicants</Modal.Title></Modal.Header>
        <Modal.Body>
          <Table bordered size="sm">
            <thead>
              <tr>
                <th>S.No</th><th>Name</th><th>Email</th><th>Contact</th><th>Status</th><th>Action</th>
                </tr>
            </thead>
            <tbody>
              {selectedApplicants.map((applicant, index) => (
                <tr key={applicant.applicantID}>
                  <td>{index + 1}</td>
                  <td>{applicant.name}</td>
                  <td>{applicant.email}</td>
                  <td>{applicant.contact}</td>
                  <td>
                  {/* <Form.Select size="sm" onChange={handleStatusChange}>
                                            <option value="">Choose status</option>
                                            <option value="Interview">Interview</option>
                                            <option value="Rejected">Rejected</option>
                                            <option value="Selected">Selected</option>
                                          </Form.Select> */}
                    <Form.Select value={applicant.selectionStatus} onChange={(e) => handleStatusChange(e.target.value, applicant.applicantID)}>
                      <option>No Action</option>
                      <option>Shortlisted</option>
                      <option>Interview</option>
                      <option>Rejected</option>
                      <option>Selected</option>
                    </Form.Select>
                  </td>
                  <td><Button size="sm" onClick={() => handleApplicantDetail(applicant)}>View</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>

      {/* Popup for specific Applicant Detail  */}
      <Modal show={showApplicantDetailModal} onHide={() => setShowApplicantDetailModal(false)}>
        <Modal.Header closeButton><Modal.Title>Applicant Details</Modal.Title></Modal.Header>
        <Modal.Body>
          {selectedApplicant && (
            <>
              <p><strong>Name:</strong> {selectedApplicant.name}</p>
              <p><strong>Email:</strong> {selectedApplicant.email}</p>
              <p><strong>Contact:</strong> {selectedApplicant.contact}</p>
              <p><strong>Skills:</strong> {selectedApplicant.skills}</p>
              <p><strong>Experience:</strong> {selectedApplicant.yeo} years</p>
              <p><strong>Description:</strong> {selectedApplicant.description}</p>
              <Button
                variant="success"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = selectedApplicant.resume; 
                  link.download = selectedApplicant.resume.split('/').pop();
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  }}
                  >
                    Download Resume
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* Popup for Recruiter Information */}
      <Modal show={showRecruiterModal} onHide={() => setShowRecruiterModal(false)}>
        <Modal.Header closeButton><Modal.Title>Recruiter Info</Modal.Title></Modal.Header>
        <Modal.Body>
          {recruiterInfo && (
            <>
              <p><strong>Name:</strong> {recruiterInfo.name}</p>
              <p><FaEnvelope /> <strong>Email:</strong> {recruiterInfo.email}</p>
              <p><FaPhone /> <strong>Contact:</strong> {recruiterInfo.contact}</p>
              <p><FaGlobe /> <a href={recruiterInfo.portfolio} target="_blank" rel="noreferrer">Portfolio</a></p>
              <p><FaLinkedin /> <a href={recruiterInfo.social} target="_blank" rel="noreferrer">LinkedIn</a></p>
            </>
          )}
        </Modal.Body>
      </Modal>


      {/* Popup to send email to applicant */}
      {showAlert && <Alert variant="success">Message sent successfully!</Alert>}
      <Modal show={showMessageModal} onHide={() => setShowMessageModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Send Message to Applicant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showValidationError && (
            <Alert variant="danger">Please fill in all the fields before sending.</Alert>
          )}
          <Form>
           <Form.Group className="mb-3">
              <Form.Label>Recruiter email</Form.Label>
              <Form.Control
                type="text"
                value={messageData.recruiterMail}
                onChange={(e) =>
                  setMessageData((prev) => ({ ...prev, recruiterMail: e.target.value }))
                }
                placeholder="Enter the recruiter mail"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={messageData.fullName}
                onChange={(e) =>
                  setMessageData((prev) => ({ ...prev, fullName: e.target.value }))
                }
                placeholder="Enter Full name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={messageData.email}
                onChange={(e) =>
                  setMessageData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Enter Email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                value={messageData.subject}
                onChange={(e) =>
                  setMessageData((prev) => ({ ...prev, subject: e.target.value }))
                }
                placeholder="Enter Subject"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Meetlink</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={messageData.meetLink}
                onChange={(e) =>
                  setMessageData((prev) => ({ ...prev, meetLink: e.target.value }))
                }
                placeholder="Enter your message"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Time</Form.Label>
              <Form.Control
                type="time"
                value={messageData.time}
                onChange={(e) =>
                  setMessageData((prev) => ({ ...prev, time: e.target.value }))
                }
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMessageModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSend}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default JobDashboard;
