import React from 'react';
import { Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import '../styles/HomePage.css';
import PostCard from './PostCard.js';

function HomePage({ posts, handleChoosePost, isLoading, isError }) {
  return (
    <div className="home-container">
      <h1>All Posts</h1>
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
            if (post.is_published === false) return null;
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