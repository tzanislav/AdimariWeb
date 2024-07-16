// src/ProjectNameContext.js
import React, { createContext, useContext, useState } from 'react';

const ProjectNameContext = createContext();

export const useProjectName = () => useContext(ProjectNameContext);

export const ProjectNameProvider = ({ children }) => {
  const [projectName, setProjectName] = useState('project-name'); // Default value

  return (
    <ProjectNameContext.Provider value={{ projectName, setProjectName }}>
      {children}
    </ProjectNameContext.Provider>
  );
};
