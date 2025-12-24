import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { uploadFile, saveProfile, getCurrentUser } from './api';
import "./img/ProfileForm.css";

const ProfileForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    city: "",
    state: "",
    department: "",
    address: "",
    gender: "",
    resume: null,
    coverLetter: null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setFormData(prev => ({ ...prev, email: user.email }));
      } catch (err) {
        console.error("Error fetching user:", err.message);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resumeUrl = formData.resume ? await uploadFile(formData.resume) : "";
      const coverLetterUrl = formData.coverLetter ? await uploadFile(formData.coverLetter) : "";

      const profile = {
        ...formData,
        resumeUrl,
        coverLetterUrl,
      };

      await saveProfile(profile);
      localStorage.setItem("jobseekerName", formData.fullName); // Save name locally
      alert("Profile saved successfully!");
      navigate("/dashboard/jobseeker");
    } catch (err) {
      console.error("Profile save failed:", err);
      alert("Failed to save profile.");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow p-4">
            <div className="text-center mb-4">
              <h4 className="fw-bold">My Profile</h4>
              <small className="text-danger">Profile: Incomplete</small>
              <div className="mt-3">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="profile"
                  className="rounded-circle"
                  style={{ width: "100px", height: "100px" }}
                />
                <h5 className="mt-2">{formData.fullName || "Your Name"}</h5>
                <p className="text-muted">{formData.email || "Your Email"}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  className="form-control"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              {['email', 'phone', 'dob', 'city', 'state', 'department', 'address'].map(field => (
                <div className="mb-3" key={field}>
                  <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    name={field}
                    type={field === 'dob' ? 'date' : 'text'}
                    className="form-control"
                    value={formData[field]}
                    onChange={handleChange}
                    readOnly={field === 'email'}
                    required={['email', 'phone', 'dob'].includes(field)}
                  />
                </div>
              ))}

              <div className="mb-3">
                <label className="form-label">Gender</label>
                <select
                  name="gender"
                  className="form-select"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Upload Resume</label>
                <input
                  type="file"
                  name="resume"
                  className="form-control"
                  onChange={handleChange}
                  accept=".pdf,.doc,.docx"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Upload Cover Letter</label>
                <input
                  type="file"
                  name="coverLetter"
                  className="form-control"
                  onChange={handleChange}
                  accept=".pdf,.doc,.docx"
                />
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary px-4">
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
