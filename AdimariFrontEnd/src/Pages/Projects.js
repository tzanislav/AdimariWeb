import React from "react";
import { useState, useEffect } from "react";
import Banner from "../components/Banner";
import axios from '../axiosConfig'; // Import the configured axios instance
import PreviousProject from "../components/PreviousProject";
import ProjectCard from "../components/ProjectCard";


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
        <Banner title={'Projects'} subtitle={" "} />
        <h1>Architecture Projects</h1>
        {projects? <ul>
          {projects.map(project => (
            <li key={project._id}>
              <ProjectCard title={project.name} thumbnail={project.images[0]} />
            </li>
          ))}
        </ul> 
        : <p>Loading....</p>}
      </div>
    );
}

export default Projects;