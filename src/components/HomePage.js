import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import '../styles/HomePage.css';
import PostCard from './PostCard.js';

function HomePage({ posts, currentPage, handleChoosePost, isLoading, isError }) {
  const [postStatus, setPostStatus] = useState('all');

  useEffect(() => {
    if (currentPage === "All Posts") {
      setPostStatus('all');
    } else if (currentPage === "Published Posts") {
      setPostStatus(true);
    } else if (currentPage === "Unpublished Posts") {
      setPostStatus(false);
    }
  }, [currentPage])

  return (
    <div className="home-container">
      <h1>{currentPage}</h1>
      {isError && <div className="error-message">Something went wrong...</div>}
      {isLoading ? (
        <ThreeDots 
          height="80" 
          width="80" 
          radius="9"
          color="rgba(17, 45, 78, 1)"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      ) : (
        <div className="home-subcontainer">
          {posts.map((post, i) => {
            if (postStatus === 'all') {
              return (
                <div key={i} onClick={() => handleChoosePost(post._id)}>
                  <Link to="/post" className="post-link">
                    <PostCard post={post} handleChoosePost={handleChoosePost} />
                  </Link>
                </div>
              )
            }
            if (post.is_published !== postStatus) return null;
            return (
              <div key={i} onClick={() => handleChoosePost(post._id)}>
                <Link to="/post" className="post-link">
                  <PostCard post={post} handleChoosePost={handleChoosePost} />
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
}

export default HomePage;