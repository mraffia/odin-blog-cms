import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar({ currentPage, handleCurrentPage }) {

  return (
    <div className="sidebar-container">
      <ul className="sidebar-nav">
        <li className="sidebar-nav-menu" style={currentPage === "All Posts" ? {"backgroundColor": "rgb(200, 200, 200)"} : {}}>
          <Link to="/" className="sidebar-nav-link" onClick={() => handleCurrentPage('All Posts')}>
            All Posts
          </Link>
        </li>
        <li className="sidebar-nav-menu" style={currentPage === "Published Posts" ? {"backgroundColor": "rgb(200, 200, 200)"} : {}}>
          <Link to="/" className="sidebar-nav-link" onClick={() => handleCurrentPage('Published Posts')}>
            Published Posts
          </Link>
        </li>
        <li className="sidebar-nav-menu" style={currentPage === "Unpublished Posts" ? {"backgroundColor": "rgb(200, 200, 200)"} : {}}>
          <Link to="/" className="sidebar-nav-link" onClick={() => handleCurrentPage('Unpublished Posts')}>
            Unpublished Posts
          </Link>
        </li>
        <li className="sidebar-nav-line">
          <hr />
        </li>
        <li className="sidebar-nav-menu" style={currentPage === "Create New Posts" ? {"backgroundColor": "rgb(200, 200, 200)"} : {}}>
          <Link to="/post/create" className="sidebar-nav-link" onClick={() => handleCurrentPage('Create New Posts')}>
            Create New Post
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;