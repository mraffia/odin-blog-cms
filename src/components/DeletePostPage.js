import React, { useState, useEffect } from 'react';
import { redirect } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';
import PostCard from './PostCard.js';
import '../styles/DeletePostPage.css';

function DeletePostPage({ currentPost }) {
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

  function handleDeletePost(e) {
    e.preventDefault();
    setSubmitDisabled(true);

    const data = new URLSearchParams();
    for (const pair of new FormData(document.getElementById('delete_form'))) {
      data.append(pair[0], pair[1]);
    }

    fetch('https://mraffia-odin-blog-api.up.railway.app/posts' + currentPost, {
      method: 'DELETE',
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        redirect("/post");
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
          <div className="home-subcontainer">
            <PostCard post={post} />
          </div>
        )}
        <form className="delete-form-container" id="delete_form">
          <input id="postid" type="hidden" name="postid" value={currentPost} required />
          <button type="submit" className="btn btn-danger" onClick={(e) => handleDeletePost(e)} disabled={submitDisabled}>Delete</button>
        </form>
      </div>
    </div>
  );
}

export default DeletePostPage;