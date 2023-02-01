import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar({ currentPage, handleCurrentPage }) {

  return (
    <div className="sidebar-container">
      <ul className="sidebar-nav">
        <li className="sidebar-nav-menu">
          <Link to="/" className="sidebar-nav-link" onClick={() => handleCurrentPage('All Posts')}>
            All Posts
          </Link>
        </li>
        <li className="sidebar-nav-menu">
          <Link to="/" className="sidebar-nav-link" onClick={() => handleCurrentPage('Published Posts')}>
            Published Posts
          </Link>
        </li>
        <li className="sidebar-nav-menu">
          <Link to="/" className="sidebar-nav-link" onClick={() => handleCurrentPage('Unpublished Posts')}>
            Unpublished Posts
          </Link>
        </li>
        <li className="sidebar-nav-line">
          <hr />
        </li>
        <li className="sidebar-nav-menu">
          <Link to="/post/create" className="sidebar-nav-link" onClick={() => handleCurrentPage('Create New Posts')}>
            Create New Post
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;