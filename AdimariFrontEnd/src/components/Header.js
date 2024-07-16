import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase-config'; // Update this path if needed
import './Header.css';
import logo from '../Assets/logo128.png';

function Header() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <header className="header">
        <div>Loading...</div>
      </header>
    );
  }

  return (
    <header className="header">
      <div className="logo">
        <NavLink to="/">
          <img src={logo} alt="Logo" />
        </NavLink>
      </div>
      <nav className="nav-links">
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? 'nav-button active' : 'nav-button')}
        >
          About
        </NavLink>
        <NavLink
          to="/gallery"
          className={({ isActive }) => (isActive ? 'nav-button active' : 'nav-button')}
        >
          Gallery
        </NavLink>
        <NavLink
          to="/previous-projects"
          className={({ isActive }) => (isActive ? 'nav-button active' : 'nav-button')}
        >
          Previous Projects
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) => (isActive ? 'nav-button active' : 'nav-button')}
        >
          Projects
        </NavLink>
        {user && (
          <NavLink
            to="/create"
            className={({ isActive }) => (isActive ? 'nav-button active' : 'nav-button')}
          >
            Create
          </NavLink>
        )}
        {user ? (
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? 'nav-button active' : 'nav-button')}
          >
            {user.email} {/* or any other user attribute */}
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? 'nav-button active' : 'nav-button')}
          >
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default Header;
