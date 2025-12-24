import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Form, Button, Dropdown, Modal, Card, Badge
} from 'react-bootstrap';
import {
  FiUsers, FiBriefcase, FiUser, FiPlus, FiBell, FiMenu, FiSearch,
  FiTrash2, FiEye, FiLogOut
} from 'react-icons/fi';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("Admin");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Email');
  const [activeTab, setActiveTab] = useState('admins');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [showAddAdminForm, setShowAddAdminForm] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    email: '',
    password: '',
    userType: 'Admin'
  });

  const [adminData, setAdminData] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.fullName) {
      setAdminName(storedUser.fullName);
    } else if (storedUser?.email) {
      axios.get(`http://localhost:8080/api/admin/profile/${storedUser.email}`)
        .then(res => setAdminName(res.data.fullName || "Admin"))
        .catch(() => setAdminName("Admin"));
    }

    axios.get("http://localhost:8080/api/admin/profile/all")
      .then(res => setAdminData(res.data))
      .catch(err => console.error("Failed to fetch admin data:", err));
  }, []);

  const handleProfileClick = () => navigate('/admin-profile');
  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchQuery('');
    setShowAddAdminForm(false);
  };

  const filteredData = () =>
    adminData.filter(admin =>
      admin.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleDeleteClick = (admin) => {
    setAdminToDelete(admin);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    axios.delete(`http://localhost:8080/api/admin/profile/delete/${adminToDelete.id}`)
      .then(() => {
        setAdminData(adminData.filter(admin => admin.id !== adminToDelete.id));
        setShowDeleteModal(false);
      })
      .catch(err => {
        console.error("Failed to delete admin:", err);
        alert("Failed to delete admin. Please try again.");
        setShowDeleteModal(false);
      });
  };

  const handleAddAdmin = () => {
    if (!newAdmin.email || !newAdmin.password) {
      alert("Email and password are required!");
      return;
    }

    const payload = {
      email: newAdmin.email,
      password: newAdmin.password,
      userType: newAdmin.userType.toLowerCase()
    };

    axios.post("http://localhost:8080/api/auth/register", payload)
      .then((res) => {
        alert("✅ Admin registered successfully!");

        const emailParts = newAdmin.email.split('@');
        const name = emailParts[0].split('.').map(part =>
          part.charAt(0).toUpperCase() + part.slice(1)
        ).join(' ');

        const newAdminObj = {
          id: res.data.id || adminData.length + 1,
          fullName: name || 'New Admin',
          email: newAdmin.email,
          role: newAdmin.userType,
          status: 'active'
        };

        setAdminData(prev => [...prev, newAdminObj]);
        setNewAdmin({ email: '', password: '', userType: 'Admin' });
        setShowAddAdminForm(false);
        setActiveTab('admins');
      })
      .catch(err => {
        console.error("❌ Failed to register admin:", err.response?.data || err.message);
        alert(err.response?.data?.message || "⚠️ Error: Could not register admin.");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="dashboard-container">
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Confirm Delete</Modal.Title></Modal.Header>
        <Modal.Body>Are you sure you want to delete {adminToDelete?.fullName}?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>

      <header className="mobile-header d-lg-none">
        <div className="header-content">
          <button className="menu-btn" onClick={toggleMobileMenu}><FiMenu size={20} /></button>
          <h1 className="brand">RecruitPro</h1>
          <div className="header-actions"><FiBell /><div className="user-avatar" onClick={handleProfileClick}></div></div>
        </div>
      </header>

      <aside className="sidebar-admin">
        <div className="sidebar-header">
          <div className="user-profile" onClick={handleProfileClick}>
            <div className="avatar"></div>
            <div className="user-info">
              <h4>{adminName}</h4>
              <p>Admin</p>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button className={`nav-item ${activeTab === 'admins' ? 'active' : ''}`} onClick={() => handleTabChange('admins')}><FiUsers /><span>Admins</span></button>
          <button className={`nav-item ${activeTab === 'recruiters' ? 'active' : ''}`} onClick={() => handleTabChange('recruiters')}><FiBriefcase /><span>Recruiters</span></button>
          <button className={`nav-item ${activeTab === 'seekers' ? 'active' : ''}`} onClick={() => handleTabChange('seekers')}><FiUser /><span>Job Seekers</span></button>
          <button className={`nav-item ${activeTab === 'addAdmin' ? 'active' : ''}`} onClick={() => { setActiveTab('addAdmin'); setShowAddAdminForm(true); }}><FiPlus /><span>Add Admin</span></button>
        </nav>
      </aside>

      <main className="main-content">
        <nav className="top-nav d-none d-lg-flex">
          <div className="search-container">
            <FiSearch />
            <input
              type="text"
              placeholder={`Search ${activeTab === 'addAdmin' ? 'admins' : activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={activeTab === 'addAdmin'}
            />
          </div>
          <div className="nav-links">
            <Button onClick={() => navigate("/select-role")}><FiLogOut /> Logout</Button>
          </div>
        </nav>

        <div className="content-header">
          <h2>{activeTab === 'addAdmin' ? 'Add New Admin' : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management`}</h2>
          {activeTab !== 'addAdmin' && (
            <div className="header-actions">
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary">Filter: {activeFilter}</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setActiveFilter('Email')}>Email</Dropdown.Item>
                  <Dropdown.Item onClick={() => setActiveFilter('Name')}>Name</Dropdown.Item>
                  <Dropdown.Item onClick={() => setActiveFilter('Status')}>Status</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </div>

        {activeTab === 'addAdmin' && (
          <div className="add-admin-form">
            <Card className="form-card">
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={newAdmin.email} onChange={handleInputChange} placeholder="Enter email" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" name="password" value={newAdmin.password} onChange={handleInputChange} placeholder="Enter password" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>User Type</Form.Label>
                    <Form.Select name="userType" value={newAdmin.userType} onChange={handleInputChange}>
                      <option value="Admin">Admin</option>
                    </Form.Select>
                  </Form.Group>
                  <Button variant="primary" onClick={handleAddAdmin} disabled={!newAdmin.email || !newAdmin.password}>Add Admin</Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        )}

        {activeTab === 'admins' && (
          <div className="data-grid">
            {filteredData().map((admin) => (
              <Card key={admin.id} className="data-card">
                <Card.Body>
                  <div className="card-header">
                    <h5>{admin.fullName}</h5>
                    <Badge bg={admin.status === 'active' ? 'success' : 'warning'}>{admin.status}</Badge>
                  </div>
                  <p className="email">{admin.email}</p>
                  <p><strong>Role:</strong> {admin.role}</p>
                  <div className="card-actions">
                    {/* <Button variant="outline-primary" size="sm"><FiEye /> View</Button> */}
                    <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(admin)}><FiTrash2 /> Delete</Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
