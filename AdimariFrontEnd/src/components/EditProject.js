import React from "react";
import axios from "../axiosConfig";

function EditProject({title, id}) {

    const DeleteProject = () => {
        // Delete the project
        axios.delete(`/api/projects/${id}`)
            .then(res => {
                console.log(res.data);
                window.location.reload();
            })
            .catch(err => {
                console.error(err.response.data);
            });
    }


    return (
        <div>
            <h2>{title}</h2>
            <h3>{id}</h3>
            <button onClick={DeleteProject}>Delete</button>          
        </div>
    );
}

export default EditProject;