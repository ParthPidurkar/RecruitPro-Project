import React, { useEffect, useState } from 'react';
import { getCurrentUser } from './api';

const AppNavbar = ({ onProfileClick, isProfilePopupOpen }) => {
  const [user, setUser] = useState({ fullName: 'Guest', email: '' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const current = await getCurrentUser();
        const localName = localStorage.getItem("jobseekerName");
        setUser({
          fullName: localName || current.fullName,
          email: current.email,
        });
      } catch (err) {
        console.error("Failed to fetch current user", err);
      }
    };
    fetchUser();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <span className="navbar-brand">RecruitPro</span>

        <div className="ms-auto d-flex align-items-center">
          <button
            className="btn btn-link nav-link"
            onClick={onProfileClick}
            style={{ position: 'relative' }}
          >
            <i className="bi bi-person-circle fs-4"></i>
            <span className="ms-2">{user.fullName}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
