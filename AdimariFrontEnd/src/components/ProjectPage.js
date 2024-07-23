// src/components/ProjectPage.js
import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { auth } from '../firebase-config';
import { Link, useParams } from 'react-router-dom';
import axios from '../axiosConfig';
import './ProjectPage.css';
import useSmoothScroll from '../hooks/useSmoothScroll';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import Carosel from './Carosel';

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const address = project?.address;
  const targetRef = useSmoothScroll(!loading && project); // Pass loading status
  
  const geocodeAddress = async (address) => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
    const data = await response.json();
    if (data.status === "OK") {
        const { lat, lng } = data.results[0].geometry.location;  // Correct destructuring
        console.log('Geocoding successful:', lat, lng);
        setLocation({ lat, lng });
    } else {
        console.error('Geocoding failed:', data.status);
        setLocation(null); // Set location to null if geocoding fails
    }
};

useEffect(() => {
    geocodeAddress(address);
}, [address]);



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
            {project.location && (

              <div className='map-container'>
                <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                  <Map
                    defaultCenter={project.location}
                    defaultZoom={14}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                  >
                    <Marker position={project.location} />
                  </Map>
                </APIProvider>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
