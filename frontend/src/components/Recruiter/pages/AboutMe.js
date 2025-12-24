import React, { useState } from 'react';
import {  Button, Form } from 'react-bootstrap';
import { FaEdit, FaLinkedin, FaGithub, FaTwitter} from 'react-icons/fa';

const AboutMe = ({profile, setProfile}) => {

  const [editMode, setEditMode] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setEditMode(false); 
  };

  return (
    <div className="container">
      <h3 className="mt-3">My Profile</h3>
      <p>Kindly setup your profile</p>
      <hr />

    
      <div className="d-flex align-items-center p-3 bg-light rounded mb-4">
         
         <div className="d-flex align-items-center me-4 mb-2">
          <img
                      src={profile.photo}
                      alt="Profile"
                      className="rounded-circle me-3"
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                    {editMode && (
                      <Form.Control
                        type="text"
                        name="photo"
                        value={profile.photo}
                        onChange={handleChange}
                        size="sm"
                        placeholder="Enter photo address image URL"
                        className="ms-2 p-2"
                        style={{ width: '250px' }}
                      />
                    )}
                    
         </div>
        <div className="flex-grow-1">
          <h5 className="mb-1">{profile.name}</h5>
          
        </div>
        {!editMode ? (
          <Button variant="outline-primary" className="ms-3" onClick={() => setEditMode(true)}>
            <FaEdit className="me-1" /> Edit
          </Button>
        ) : (
          <Button variant="success" className="ms-3" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>

   
      <div className="row g-3 mb-4">
        {[
          ['Name', 'name'],
          ['Email', 'email'],
          ['Contact', 'contact'],          
          ['Year of Experience', 'experience'],
          ['Role', 'role'],
        ].map(([label, key]) => (
          <div className="col-md-6" key={key}>
            <strong>{label}:</strong>{' '}
            {!editMode ? (
              <span>{profile[key]}</span>
            ) : (
              <Form.Control
                type="text"
                name={key}
                value={profile[key]}
                onChange={handleChange}
                size="sm"
              />
            )}
          </div>
        ))}
      </div>

     
      <div className="mb-4">
        <strong>Portfolio Website:</strong>{' '}
        {!editMode ? (
          <a href={profile.portfolio} target="_blank" rel="noopener noreferrer">
            {profile.portfolio}
          </a>
        ) : (
          <Form.Control
            type="text"
            name="portfolio"
            value={profile.portfolio}
            onChange={handleChange}
            size="sm"
          />
        )}
      </div>

    
      <div className="mb-5">
        <strong>Social Links:</strong>
        {!editMode ? (
          <div className="mt-2 d-flex gap-3">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} />
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} />
            </a>
            <a href={profile.twitter} target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} />
            </a>
            
          </div>
        ) : (
          <>
            <Form.Group className="mb-2">
              <Form.Label>LinkedIn</Form.Label>
              <Form.Control
                type="text"
                name="linkedin"
                value={profile.linkedin}
                onChange={handleChange}
                size="sm"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>GitHub</Form.Label>
              <Form.Control
                type="text"
                name="github"
                value={profile.github}
                onChange={handleChange}
                size="sm"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Twitter</Form.Label>
              <Form.Control
                type="text"
                name="twitter"
                value={profile.twitter}
                onChange={handleChange}
                size="sm"
              />
            </Form.Group>
            
          </>
        )}
      </div>

    </div>
  );
};

export default AboutMe;
