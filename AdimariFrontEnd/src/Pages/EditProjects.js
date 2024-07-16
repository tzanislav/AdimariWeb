import React from "react";
import { useState, useEffect } from "react";
import EditProject from "../components/EditProject";
import Banner from "../components/Banner";
import axios from '../axiosConfig'; // Import the configured axios instance

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
            <h1>Architecture Projects</h1>
            {projects ? <ul>
                {projects.map(project => (
                    <li key={project._id}>
                        <EditProject title={project.name} id={project._id} />
                    </li>
                ))}
            </ul>
                : <p>Loading....</p>}
        </div>
    );
}

export default EditProjects;