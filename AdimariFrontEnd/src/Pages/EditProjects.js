import React from "react";
import { Link } from "react-router-dom";
import axios from "../axiosConfig";
import { useState, useEffect } from "react";
import Banner from "../components/Banner";

function EditProjects() {

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
            <Banner title={'Edit Projects'} subtitle={" "} />

            {projects ? <ul>
                {projects.map(project => (
                    <li key={project._id}>
                        <Link to={`/projects/${project._id}`}> {project.name} </Link>

                    </li>
                ))}
            </ul>
                : <p>Loading....</p>}
                 
        </div>
    );
   
}

export default EditProjects;