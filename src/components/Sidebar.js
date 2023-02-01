import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar({ currentPage }) {
  return (
    <div className="sidebar-container">
      <ul className="sidebar-nav">
        <li className="sidebar-nav-menu" style={currentPage === "allPosts" ? {"backgroundColor": "rgb(200, 200, 200)"} : {}}>
          <Link to="/" className="sidebar-nav-link">
            All Posts
          </Link>
        </li>
        <li className="sidebar-nav-menu" style={currentPage === "publishedPosts" ? {"backgroundColor": "rgb(200, 200, 200)"} : {}}>
          <Link to="/" className="sidebar-nav-link">
            Published Posts
          </Link>
        </li>
        <li className="sidebar-nav-menu" style={currentPage === "unpublishedPosts" ? {"backgroundColor": "rgb(200, 200, 200)"} : {}}>
          <Link to="/" className="sidebar-nav-link">
            Unpublished Posts
          </Link>
        </li>
        <li className="sidebar-nav-line">
          <hr />
        </li>
        <li className="sidebar-nav-menu" style={currentPage === "createPosts" ? {"backgroundColor": "rgb(200, 200, 200)"} : {}}>
          <Link to="/post/create" className="sidebar-nav-link">
            Create New Post
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;