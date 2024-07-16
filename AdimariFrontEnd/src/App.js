// src/App.js
import React, { useEffect } from 'react';
import Header from './components/Header';
import Home from './Pages/Home';
import About from './Pages/About';
import Gallery from './Pages/Gallery';
import PreviousProjects from './Pages/PreviousProjects';
import NotFound from './components/NotFound';
import { Routes, Route } from 'react-router-dom';

import Login from './Pages/Login';
import UserList from './Pages/UserList';
import Projects from './Pages/Projects';
import NewProject from './Pages/NewProject';
import EditProjects from './Pages/EditProjects';



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
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/previous-projects" element={<PreviousProjects />} />
        <Route path="/create" element={<NewProject />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/edit" element={<EditProjects />} />


      </Routes>
    </div>
  );
}

export default App;
