import React from "react";
import { useState, useEffect } from "react";
import Banner from "../components/Banner";
import axios from '../axiosConfig'; // Import the configured axios instance


function Projects() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const res = await axios.get('/api/projects');
          setProjects(res.data);
        } catch (err) {
          console.error(err.response.data);
        }
      };
  
      fetchProjects();
    }, []);
  
    return (
      <div>
        <h1>Architecture Projects</h1>
        <ul>
          {projects.map(project => (
            <li key={project._id}>
              <h2>{project.name}</h2>
              <p>Status: {project.status}</p>
              <p>Area: {project.area}</p>
              <p>Location: {project.location}</p>
              <p>Description: {project.description}</p>
              <div>
                {project.images.map((image, index) => (
                  <img key={index} src={image} alt={`Project ${project.name}`} />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default Projects;