import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Nav.css';

function Nav({ handleCurrentPage }) {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-title-link">
        <div className="nav-title" onClick={() => handleCurrentPage('All Posts')}>Odin Blog CMS</div>
      </Link>
      <ul className="nav-links">
        <Link to="/login" className="nav-link">
          <li>Log In</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;