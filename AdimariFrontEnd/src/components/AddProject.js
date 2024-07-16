// src/components/AddProject.js
import React, { useState } from 'react';
import axios from '../axiosConfig'; // Import the configured axios instance
import { useNavigate } from 'react-router-dom';

const AddProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    status: '',
    area: '',
    location: '',
    images: [],
    description: '',
  });

  const { name, status, area, location, images, description } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newProject = { name, status, area, location, images, description };

    try {
      await axios.post('/api/projects', newProject);
      console.log('Project added successfully');
      navigate('/');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h1>Add New Project</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Project Name"
          required
        />
        <input
          type="text"
          name="status"
          value={status}
          onChange={onChange}
          placeholder="Status"
          required
        />
        <input
          type="number"
          name="area"
          value={area}
          onChange={onChange}
          placeholder="Area"
          required
        />
        <input
          type="text"
          name="location"
          value={location}
          onChange={onChange}
          placeholder="Location"
          required
        />
        <input
          type="file"
          name="images"
          multiple
          onChange={onImageChange}
          required
        />
        <textarea
          name="description"
          value={description}
          onChange={onChange}
          placeholder="Description"
          required
        />
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default AddProject;
