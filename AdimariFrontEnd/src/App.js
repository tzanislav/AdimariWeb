// src/App.js
import React, { useEffect } from 'react';
import Header from './components/Header';
import Home from './Pages/Home';
import About from './Pages/About';
import Footer from './components/Footer';

import PreviousProjects from './Pages/PreviousProjects';
import NotFound from './components/NotFound';
import { Routes, Route } from 'react-router-dom';

import Login from './Pages/Login';
import UserList from './Pages/UserList';
import Projects from './Pages/Projects';
import CreateProject from './Pages/CreateProject';
import EditProjects from './Pages/EditProjects';
import EditProjectItem from './components/EditProjectItem';
import ProjectPage from './components/ProjectPage';



function App() {
  return (
      <AppContent />
  );
}

function AppContent() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/previous-projects" element={<PreviousProjects />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/edit-project" element={<EditProjects />} />
        <Route path="/edit-project/:id" element={<EditProjectItem /> } />
        <Route path="/projects/:id" element={<ProjectPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
