import React from 'react';
import { useNavigate } from 'react-router-dom';
import defaultProfilePic from './img/default-profile.png';

const ProfilePopup = ({ user, onClose }) => {
  const navigate = useNavigate();
  const profileImage = user.imageUrl || defaultProfilePic;

  const handleProfileClick = () => {
    navigate("/profile");
    onClose?.();
  };

  const handleAppliedJobs = () => {
    navigate("/dashboard/jobseeker");
    onClose?.();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
    navigate("/select-role");
  };

  return (
    <div
      className="profile-popup card shadow-sm p-3"
      style={{ width: '200px', position: 'absolute', right: '10px', zIndex: 999 }}
    >
      <div className="text-center mb-3">
        <img
          src={profileImage}
          alt="Profile"
          className="rounded-circle"
          style={{ width: "70px", height: "70px", objectFit: "cover" }}
        />
        <h6 className="mt-2 mb-0">{user.fullName || "My Profile"}</h6>
        <small className="text-muted">{user.email}</small>
      </div>

      <ul className="list-group list-group-flush">
        <li onClick={handleProfileClick} className="list-group-item" style={{ cursor: 'pointer' }}>
          <i className="bi bi-pencil-square me-2"></i> Profile
        </li>

        <li onClick={handleAppliedJobs} className="list-group-item" style={{ cursor: 'pointer' }}>
          <i className="bi bi-list-check me-2"></i> Applied Jobs
        </li>

        <li onClick={handleLogout} className="list-group-item text-danger" style={{ cursor: 'pointer' }}>
          <i className="bi bi-box-arrow-right me-2"></i> Log Out
        </li>
      </ul>
    </div>
  );
};

export default ProfilePopup;
