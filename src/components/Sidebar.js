import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar({ currentPage, handleCurrentPage }) {

  return (
    <div className="sidebar-container">
      <ul className="sidebar-nav">
        <li className="sidebar-nav-menu" onClick={() => handleCurrentPage('All Posts')} style={currentPage === "All Posts" ? {"backgroundColor": "rgb(200, 200, 200)"} : {}}>
          <Link to="/" className="sidebar-nav-link">
            All Posts
          </Link>
        </li>
        <li className="sidebar-nav-menu" onClick={() => handleCurrentPage('Published Posts')} style={currentPage === "Published Posts" ? {"backgroundColor": "rgb(200, 200, 200)"} : {}}>
          <Link to="/" className="sidebar-nav-link">
            Published Posts
          </Link>
        </li>
        <li className="sidebar-nav-menu" onClick={() => handleCurrentPage('Unpublished Posts')} style={currentPage === "Unpublished Posts" ? {"backgroundColor": "rgb(200, 200, 200)"} : {}}>
          <Link to="/" className="sidebar-nav-link">
            Unpublished Posts
          </Link>
        </li>
        <li className="sidebar-nav-line">
          <hr />
        </li>
        <li className="sidebar-nav-menu" onClick={() => handleCurrentPage('Create New Posts')} style={currentPage === "Create New Posts" ? {"backgroundColor": "rgb(200, 200, 200)"} : {}}>
          <Link to="/post/create" className="sidebar-nav-link">
            Create New Post
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;