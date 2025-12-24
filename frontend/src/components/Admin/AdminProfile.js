import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminProfileEdit.css";

const AdminProfileEdit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    dob: "",
    gender: "Male",
    role: "Admin",
    experience: "",
    phone: "",
    address: "",
    portfolio: "",
    linkedin: "",
    github: "",
    twitter: "",
    skills: "",
    coverLetterText: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedEmail = storedUser?.email;

    if (!storedEmail) return;

    setFormData(prev => ({ ...prev, email: storedEmail }));

    axios.get(`http://localhost:8080/api/admin/profile/${storedEmail}`)
      .then((res) => {
        if (res.data) {
          setFormData({ ...res.data, email: storedEmail });
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      socialLinks: {
        linkedin: formData.linkedin,
        github: formData.github,
        twitter: formData.twitter,
      }
    };

    try {
      await axios.post("http://localhost:8080/api/admin/profile/save", payload);
      alert("✅ Profile saved successfully!");
      navigate("/dashboard/admin");
    } catch (err) {
      console.error("❌ Error saving profile:", err);
      alert("❌ Failed to save profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => navigate(-1);

  return (
    <div className="container-fluid p-3 bg-light min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Edit Profile</h2>
        <button onClick={handleBack} className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-1"></i> Back
        </button>
      </div>

      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white py-3">
          <h5 className="mb-0">Admin Profile Information</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              {[
                { name: "fullName", label: "Full Name", required: true },
                { name: "contact", label: "Contact" },
                { name: "dob", label: "Date of Birth", type: "date" },
                { name: "experience", label: "Years of Experience" },
                { name: "phone", label: "Phone", type: "tel", required: true },
                { name: "address", label: "Address" }
              ].map((field) => (
                <div className="col-md-6" key={field.name}>
                  <label className="form-label fw-semibold">
                    {field.label} {field.required && <span className="text-danger">*</span>}
                  </label>
                  <input
                    type={field.type || "text"}
                    className="form-control"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                  />
                </div>
              ))}

              <div className="col-md-6">
                <label className="form-label fw-semibold">Email <span className="text-danger">*</span></label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Gender</label>
                <select
                  className="form-select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Role</label>
                <input
                  type="text"
                  className="form-control"
                  value="Admin"
                  disabled
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Portfolio Website</label>
                <div className="input-group">
                  <span className="input-group-text">https://</span>
                  <input
                    type="text"
                    className="form-control"
                    name="portfolio"
                    placeholder="yourportfolio.com"
                    value={formData.portfolio}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Social Links */}
              {["linkedin", "github", "twitter"].map((platform) => (
                <div className="col-md-4" key={platform}>
                  <label className="form-label fw-semibold text-capitalize">{platform} Profile</label>
                  <input
                    type="text"
                    className="form-control"
                    name={platform}
                    placeholder={`${platform}.com/yourhandle`}
                    value={formData[platform]}
                    onChange={handleChange}
                  />
                </div>
              ))}

              <div className="col-12">
                <label className="form-label fw-semibold">Skills</label>
                <input
                  type="text"
                  className="form-control"
                  name="skills"
                  placeholder="JavaScript, Spring Boot"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Cover Letter</label>
                <textarea
                  className="form-control"
                  name="coverLetterText"
                  rows="4"
                  value={formData.coverLetterText}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-12 d-flex justify-content-between align-items-center mt-3 flex-wrap gap-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="termsCheck" required />
                  <label className="form-check-label" htmlFor="termsCheck">
                    I agree to the terms and conditions
                  </label>
                </div>
                <button type="submit" className="btn btn-success px-4" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span> Saving...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-save me-2"></i> Save Profile
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileEdit;
