import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from '../axiosConfig'; // Make sure to import your axios instance
import Banner from "./Banner";
import './EditProjectItem.css';

function EditProjectItem() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/api/projects/${id}`);
        setProject(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data || 'Error fetching project data');
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const [formData, setFormData] = useState({
    name: '',
    status: '',
    type: '',
    area: '',
    location: '',
    images: [],
    imagesToAdd: [],
    imagesToDelete: [],
    description: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        status: project.status || '',
        type: project.type || '',
        area: project.area || '',
        location: project.location || '',
        images: project.images || [],
        imagesToAdd: [],
        imagesToDelete: [],
        description: project.description || '',
      });
    }
  }, [project]);

  const { name, status, type, area, location, images, imagesToAdd, imagesToDelete, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    setFormData({ ...formData, imagesToAdd: [...imagesToAdd, ...Array.from(e.target.files)] });
  };

  const deleteImage = (index) => {
    const imageToDelete = images[index];
    setFormData({
      ...formData,
      images: images.filter((_, i) => i !== index),
      imagesToDelete: [...imagesToDelete, imageToDelete],
    });
  };

  const deleteNewImage = (index) => {
    setFormData({ ...formData, imagesToAdd: imagesToAdd.filter((_, i) => i !== index) });
  };

  const setImageAsFirst = (index) => {
    const newImagesArray = [...images];
    const [selectedImage] = newImagesArray.splice(index, 1);
    newImagesArray.unshift(selectedImage);
    setFormData({ ...formData, images: newImagesArray });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', name);
    formDataToSend.append('status', status);
    formDataToSend.append('type', type);
    formDataToSend.append('area', area);
    formDataToSend.append('location', location);
    formDataToSend.append('description', description);

    // Append new image files to formData
    imagesToAdd.forEach((image) => {
      formDataToSend.append('imagesToAdd', image);
    });

    // Append imagesToDelete as a JSON string
    formDataToSend.append('imagesToDelete', JSON.stringify(imagesToDelete));

    try {
      await axios.put(`/api/projects/${project._id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Project updated successfully');
      setUpdateStatus('Project updated successfully');
      window.location.reload();
    } catch (err) {
      console.error(err.response?.data || err.message); // Log actual error
      setError(err.response?.data || 'Error updating project');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="edit-project">
      <Banner
        title="Edit Project"
        subtitle={name}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backgroundImage: `url(${images[0]}) !important`,
          backgroundSize: 'cover',  // This ensures the image covers the entire Banner
          backgroundPosition: 'center'  // This centers the image in the Banner
        }}
      />
      <div className="edit-project-container">

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
          <button type="submit">Update Project</button>
        </form>
        {updateStatus && <div>{updateStatus}</div>}
        <div className="edit-project-images">
          <h3>Current Images</h3>
          {images.map((image, index) => (
            <div key={index} className="edit-project-image">
              <p>{`Image ${index + 1}`}</p>
              <img src={typeof image === 'string' ? image : URL.createObjectURL(image)} alt={`Project Image ${index + 1}`} style={{ width: '200px', margin: '10px' }} />
              <button type="button" onClick={() => deleteImage(index)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EditProjectItem;
