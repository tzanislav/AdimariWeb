import React from "react";
import "./ProjectCard.css";
import { Link } from "react-router-dom";

function ProjectCard({ project }) {


    return (
        <div className="project-card">
            <Link to={`/projects/${project._id}`}>
                <div className="project-card-textbox">
                    <h1>{project.name}</h1>
                </div>
            </Link>
            <img src={project.images[0]} alt={project.name} />
        </div>
    );
}

export default ProjectCard;