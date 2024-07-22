// src/components/ProjectPage.js
import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { auth } from '../firebase-config';
import { Link, useParams } from 'react-router-dom';
import axios from '../axiosConfig';
import './ProjectPage.css';
import useSmoothScroll from '../hooks/useSmoothScroll';

import Carosel from './Carosel';

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const targetRef = useSmoothScroll(!loading && project); // Pass loading status


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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


 


  return (
    <div>
      <div className="project-hero-image" ref={targetRef}>
        <div className="project-hero-overlay"></div>
        <img src={project.images[0]} alt="Project Hero" ></img>
        <div className="project-hero-text">
          <p>{project.type}</p>
          <h1>{project.name}</h1>
        </div>
      </div>
      
      {auth.currentUser && <Link to={'/edit-project/' + project._id}> Edit Project</Link>}
      
      <div className='project-description'>
        <p>{project.description}</p>

      </div>

      <div className='project-carosel'>
        <Carosel imageData={project.images} />
      </div>

      <div className='project-technical-features'>
        <div className='project-technical-features-title'>
          <h2>Technical Features:</h2>
        </div>
        <div className='project-technical-features-list'>
          <div className='project-technical-features-items'>

            <h3>Status:</h3>
            <p> {project.status}</p>
            {project.area > 0 &&
              <h3>Area:</h3>}
            {project.area > 0 && 
            <p>{project.area} m2</p>}
            <h3>Location:</h3>
            <p>{project.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
