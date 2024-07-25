import React from "react";
import { Link } from "react-router-dom";
import axios from "../axiosConfig";
import { useState, useEffect } from "react";
import './Project_Item.css';

function Project_Item({ project }) {

    const DeleteProject = () => {
        // Delete the project
        axios.delete(`/api/projects/${project._id}`)
            .then(res => {
                console.log(res.data);
                window.location.reload();
            })
            .catch(err => {
                console.error(err.response.data);
            });
    }


    return (
        <div className="project-tile">

            <div className="project-info">
                {project ? <Link to={`/edit-project/${project._id}`}> <img src={project.images[0]} alt="Project" /> </Link> : <p>Loading...</p>}
            </div>
            <div className="project-text">
                <h2>{project.name}</h2>
            </div>
            <button onClick={DeleteProject}>Delete</button>

        </div>
    );
}

export default Project_Item;