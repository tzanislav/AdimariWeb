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
      <div className="projects-container">
        {projects ? projects.map(project => (
          <ProjectCard project={project}  key={project._id} />
        ))

          : <p>Loading....</p>}
      </div>
    </div>
  );
}

export default Projects;