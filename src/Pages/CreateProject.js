import React from 'react';
import ProjectForm from '../components/ProjectForm';
import Banner from '../components/Banner';

function CreateProject() {
    return (
        <div className="App">
            <Banner title="Create a New Project" subtitle="Fill in the form below to create a new project." />
            
            <h1>Create a New Project</h1>
            <ProjectForm />
        </div>
    );
}

export default CreateProject;
