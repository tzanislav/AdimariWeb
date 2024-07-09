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
        <NavLink to="/about" className="nav-button" activeClassName="active">
          About
        </NavLink>
        <NavLink to="/gallery" className="nav-button" activeClassName="active">
          Gallery
        </NavLink>
        <NavLink to="/previous-projects" className="nav-button" activeClassName="active">
          Previous Projects
        </NavLink>
        {user && (
        <NavLink to="/create" className="nav-button" activeClassName="active">
          Create
        </NavLink>
        ) }

        {user ? (
          <NavLink to="/login" className="nav-button" activeClassName="active">
            {user.email} {/* or any other user attribute */}
            </NavLink>
        ) : (
          <NavLink to="/login" className="nav-button" activeClassName="active">
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default Header;
