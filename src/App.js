// src/App.js
import React, { useEffect } from 'react';
import { ProjectNameProvider, useProjectName } from './ProjectNameContext';
import Header from './components/Header';
import Home from './Pages/Home';
import About from './Pages/About';
import Gallery from './Pages/Gallery';
import PreviousProjects from './Pages/PreviousProjects';
import NotFound from './components/NotFound';
import { Routes, Route } from 'react-router-dom';
import CreateProject from './Pages/CreateProject';
import Login from './Pages/Login';


function App() {
  return (
    <ProjectNameProvider>
      <AppContent />
    </ProjectNameProvider>
  );
}

function AppContent() {
  const { setProjectName } = useProjectName();

  useEffect(() => {
    setProjectName('Berberov');
  }, [setProjectName]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/previous-projects" element={<PreviousProjects />} />
        <Route path="/create" element={<CreateProject />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/firebase-test" element={<FirebaseTest />} />
      </Routes>
    </div>
  );
}

export default App;
