import React, { useState } from 'react';
import axios from '../axiosConfig'; // Import the configured axios instance
import { useNavigate } from 'react-router-dom';
import './AddProject.css';

const AddProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    status: '',
    area: '',
    location: '',
    images: [],
    description: '',
  });

  const { name, status,type, area, location, images, description } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  const onSubmit = async (e) => {
    console.log('AddProject');
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', name);
    formDataToSend.append('status', status);
    formDataToSend.append('type', type);
    formDataToSend.append('area', area);
    formDataToSend.append('location', location);
    formDataToSend.append('description', description);
    images.forEach((image, index) => {
      formDataToSend.append(`images`, image);
    });

    try {
      await axios.post('/api/projects', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Project added successfully');
      //reload the page
      navigate('/create-project', { replace: true });

    } catch (err) {
      console.error(err.response.data);
    }
  };

  const testConnection = async () => {
    try {
      const res = await axios.get('/test');
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  }

  return (
    <div className="add-new-project">
      <h1>Add New Project</h1>

      <button onClick={testConnection}>Test Connection</button>
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
        />
        
        
        <select name="type" value={type} onChange={onChange}>
          <option value="Architecture">Architecture</option>
          <option value="Interior">Interior</option>
        </select>
        
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
        />
        <input
          type="file"
          name="images"
          multiple
          onChange={onImageChange}
        />
        <textarea
          name="description"
          value={description}
          onChange={onChange}
          placeholder="Description"
        />
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default AddProject;
