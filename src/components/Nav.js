import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Nav.css';

function Nav({ handleCurrentPage, handleLogout }) {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-title-link">
        <div className="nav-title" onClick={() => handleCurrentPage('All Posts')}>Odin Blog CMS</div>
      </Link>
      {!localStorage.getItem("user_token") ? (
        <ul className="nav-links">
          <Link to="/login" className="nav-link">
            <li>Log In</li>
          </Link>
        </ul>
      ) : (
        <ul className="nav-links">
          <li className="nav-name">{localStorage.getItem("user_name")}</li>
          <li className="nav-link" onClick={() => handleLogout()}>Log Out</li>
        </ul>
      )}
    </nav>
  );
}

export default Nav;