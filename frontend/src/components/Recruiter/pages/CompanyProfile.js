import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import {
  FaEdit,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa';

const CompanyProfile = ({companyData, setCompanyData}) => {

  const [editMode, setEditMode] = useState(false);
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({ ...prev, [name]: value }));
  };



  const handleSubmit = () => {
    setEditMode(false);
  };

  return (


    <div className="d-flex justify-content-center ">
      <div className="container" style={{ maxWidth: '1440px' }}>

        <h3 className="mt-2">Company Profile</h3>
        <p>Set up and manage your company information</p>
        
        <hr />

       {/* Compant data */}
        <div className="d-flex align-items-center p-3 bg-light rounded mb-4 flex-wrap">
          <div className="d-flex align-items-center me-4 mb-2">
            <img
              src={companyData.logo}
              alt="Company Logo"
              className="rounded me-2"
              style={{ width: '80px', height: '80px', objectFit: 'cover' }}
            />
            {editMode && (
              <Form.Control
                type="text"
                name="logo"
                value={companyData.logo}
                onChange={handleChange}
                size="sm"
                placeholder="Enter logo image URL"
                className="ms-2 p-2"
                style={{ width: '250px' }}
              />
            )}
          </div>

          <div className="flex-grow-1 mb-2">
            <h5 className="mb-1">{companyData.name}</h5>
            <small className="text-muted">{companyData.industry}</small>
          </div>

          <div className="ms-auto">
            {!editMode ? (
              <Button variant="outline-primary" onClick={() => setEditMode(true)}>
                <FaEdit className="me-1" /> Edit
              </Button>
            ) : (
              <Button variant="success" onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </div>
        </div>

        {/* About Section */}
        <div className="mb-4 ">
          <strong>About Company:</strong>
          {!editMode ? (
            <p className="mt-2">{companyData.about}</p>
          ) : (
            <Form.Control
              as="textarea"
              rows={4}
              name="about"
              value={companyData.about}
              onChange={handleChange}
              size="sm"
              className="p-2 "
            />
          )}
        </div>

        {/* Basic Info Grid */}
        <div className="row g-3 mb-4 ">
          {[
            ['Company Name', 'name'],
            ['Email', 'email'],
            ['Contact no.', 'phone'],
            ['Industry type', 'industry'],
            ['Company Size', 'size'],
          ].map(([label, key]) => (
            <div className="col-md-6 " key={key}>
              <Form.Label><strong>{label}:</strong></Form.Label>
              {!editMode ? (
                <div>{companyData[key]}</div>
              ) : (
                <Form.Control
                  type="text"
                  name={key}
                  value={companyData[key]}
                  onChange={handleChange}
                  size="sm"
                  className="p-2"
                />
              )}
            </div>
          ))}

          <div className="col-md-6">
            <Form.Label><strong>Founded year:</strong></Form.Label>
            {!editMode ? (
              <div>{companyData.founded}</div>
            ) : (
              <Form.Control
                type="number"
                name="founded"
                value={companyData.founded}
                onChange={handleChange}
                size="sm"
                className="p-2"
                min="1900"
                max={new Date().getFullYear()}
                placeholder="Enter year"
              />
            )}
          </div>

          {!editMode ? (
            <div className="col-md-6">
              <strong>Location:</strong> {companyData.city}, {companyData.country}
            </div>
          ) : (
            <>
              <div className="col-md-6">
                <Form.Label><strong>City</strong></Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={companyData.city}
                  onChange={handleChange}
                  size="sm"
                  placeholder="Enter city"
                  className="p-2"
                />
              </div>
              <div className="col-md-6">
                <Form.Label><strong>Country</strong></Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={companyData.country}
                  onChange={handleChange}
                  size="sm"
                  placeholder="Enter country"
                  className="p-2"
                />
              </div>
            </>
          )}
        </div>

        {/* Website */}
        <div className="mb-4">
          <strong>Website:</strong>{' '}
          {!editMode ? (
            <a href={companyData.website} target="_blank" rel="noopener noreferrer">
              {companyData.website}
            </a>
          ) : (
            <Form.Control
              type="text"
              name="website"
              value={companyData.website}
              onChange={handleChange}
              size="sm"
              className="p-2"
            />
          )}
        </div>

        {/* Social Links */}
        <div className="mb-5">
          <strong>Social Links:</strong>
          {!editMode ? (
            <div className="mt-2 d-flex gap-3">
              <a href={companyData.linkedin} target="_blank" rel="noopener noreferrer">
              
                <FaLinkedin size={24} />
              </a>
              <a href={companyData.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter size={24} />
              </a>
            </div>
          ) : (
            <>
              <Form.Group className="mb-3">
                <Form.Label>LinkedIn</Form.Label>
                <Form.Control
                  type="text"
                  name="linkedin"
                  value={companyData.linkedin}
                  onChange={handleChange}
                  size="sm"
                  className="p-2"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Twitter</Form.Label>
                <Form.Control
                  type="text"
                  name="twitter"
                  value={companyData.twitter}
                  onChange={handleChange}
                  size="sm"
                  className="p-2"
                />
              </Form.Group>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
