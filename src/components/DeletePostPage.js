import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';
import PostCard from './PostCard.js';
import '../styles/DeletePostPage.css';

function DeletePostPage({ currentPost, handlePostsEdited }) {
  const [post, setPost] = useState({
    "_id": "",
    "author": {},
    "title": "",
    "content": "", 
    "is_published": true, 
    "timestamp": "",
  });
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [isLoadingPost, setIsLoadingPost] = useState(false);
  const [isErrorPost, setIsErrorPost] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  const navigate = useNavigate();

  function handleDeletePost(e) {
    e.preventDefault();
    setSubmitDisabled(true);

    const data = new URLSearchParams();
    for (const pair of new FormData(document.getElementById('delete_form'))) {
      data.append(pair[0], pair[1]);
    }

    fetch('https://mraffia-odin-blog-api.up.railway.app/posts/' + currentPost, {
      method: 'DELETE',
      headers: {
        'Authorization': 'bearer ' + localStorage.getItem('user_token')
      },
    })
      .then((response) => {
        if (response.status === 401) {
          setUnauthorized(true);
        }
        return response.json()
      })
      .then((data) => {
        handlePostsEdited('delete');
        navigate("/");
        setSubmitDisabled(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    setIsErrorPost(false);
    setIsLoadingPost(true);

    fetch('https://mraffia-odin-blog-api.up.railway.app/posts/' + currentPost)
      .then((response) => response.json())
      .then((data) => {
        setPost(data.post);
        setIsLoadingPost(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsErrorPost(false);
      });
  }, []);

  return (
    <div className="delete-container">
      <h1 className="delete-title">Delete Post</h1>
      <div className="delete-form">
        <div className="delete-message">Do you really want to delete this Post?</div>
        {isErrorPost && <div className="error-message">Something went wrong...</div>}
        {isLoadingPost ? (
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
          <div className="delete-subcontainer">
            <PostCard post={post} />
            <form className="delete-form-container" id="delete_form">
              <input id="postid" type="hidden" name="postid" value={currentPost} required />
              <button type="submit" className="btn btn-danger" onClick={(e) => handleDeletePost(e)} disabled={submitDisabled}>Delete</button>
            </form>
          </div>
        )}
        {unauthorized ? (
          <div className="create-form-error">User access token expired. Please logout and re-login to continue deleting this post.</div>
        ) : (
          null
        )}
      </div>
    </div>
  );
}

export default DeletePostPage;