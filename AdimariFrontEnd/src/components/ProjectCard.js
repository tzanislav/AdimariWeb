import React from "react";

function ProjectCard({ title, thumbnail }) {


    return (
        <div>
            <h1>{title}</h1>
            <img src={thumbnail} alt={title} />
        </div>
    );
}

export default ProjectCard;