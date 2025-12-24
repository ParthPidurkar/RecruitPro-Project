import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ collapsed, setCollapsed, companyData }) => {
  


  const menuItems = [
    { name: 'Company Profile', icon: 'bi-building', path: '/dashboard/recruiter' },
    { name: 'About Me', icon: 'bi-person', path: '/dashboard/recruiter/about' },
    { name: 'My Dashboard', icon: 'bi-briefcase', path: '/dashboard/recruiter/jobdashboard' },
    { name: "Logout", icon:"bi-Logout", path: "/select-role"},
  ];


  return (
    <div className="position-relative">
      {/* Sidebar Container */}
      <div className="d-flex flex-column align-items-center h-100  bg-light" style={{  transition: 'width 0.3s' }}>
        {/* Company Info */}
        <div className="text-center mb-3 mt-4">
          <img
            src={companyData?.logo || '/default.png'}
            alt="Company Logo"
            className="rounded-circle"
            style={{ width: collapsed ? '40px' : '80px', transition: 'width 0.3s' }}
          />
          {!collapsed && (
            <>
              <h4 className="mt-2 mb-2">{companyData?.name || 'Company Name'}</h4>
              <h6 className="text-muted">Recruiter Dashboard</h6>
            </>
          )}
        </div>

        {/* Navigation Links */}
        <nav className={`nav flex-column  p-3 w-100 ${!collapsed ? '' : 'align-items-center'}`}>
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end
              className={({ isActive }) =>
                `nav-link d-flex align-items-center mb-2 ${isActive ? 'active' : ''} ${item.name === 'Logout' ? 'text-danger' : ''}`
              }
            >
              <i
                className={`bi ${item.icon} ${!collapsed ? 'me-2' : ''}`}
                style={{ fontSize: '1.2rem' }}
              />
              {!collapsed && <span className={item.name === 'Logout' ? 'text-danger' : ''}>{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Toggle Button (outside at top-right) */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="btn btn-outline-secondary position-absolute"
        style={{
          top: '4px',
          right: '-45px',
          zIndex: 10,
          outline: 'none',
          border: 'none',
          boxShadow: 'none',
          
        }}
      >
        <i className={`bi ${collapsed ? 'bi-arrow-right-circle' : 'bi-arrow-left-circle'}`}></i>
      </button>
    </div>
  );
};

export default Sidebar;
