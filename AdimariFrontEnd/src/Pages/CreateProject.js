import React from "react";
import { useState, useEffect } from "react";
import Project_Item from "../components/Project_Item";
import Banner from "../components/Banner";
import axios from '../axiosConfig'; // Import the configured axios instance
import AddProject from "../components/AddProject";

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
            <div className="create-project">
                <AddProject />
            </div>
            <h1>Architecture Projects</h1>
            {projects ? <ul>
                {projects.map(project => (
                    <li key={project._id}>
                        <Project_Item  project={project} />

                    </li>
                ))}
            </ul>
                : <p>Loading....</p>}


        </div>
    );
}

export default EditProjects;