import React, { useState, useEffect } from 'react';
import { redirect } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';
import '../styles/UpdatePostPage.css';

function UpdatePostPage({ currentPost }) {
  const [post, setPost] = useState({
    "_id": "",
    "author": {},
    "title": "",
    "content": "", 
    "is_published": true, 
    "timestamp": "",
  });
  const [isLoadingPost, setIsLoadingPost] = useState(false);
  const [isErrorPost, setIsErrorPost] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [updateFormError, setUpdateFormError] = useState([]);

  function handleUpdatePost(e) {
    e.preventDefault();
    setSubmitDisabled(true);

    const data = new URLSearchParams();
    for (const pair of new FormData(document.getElementById('update_form'))) {
      data.append(pair[0], pair[1]);
    }

    fetch('https://mraffia-odin-blog-api.up.railway.app/posts/' + currentPost, {
      method: 'PUT',
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          setUpdateFormError(data.errors);
        } else {
          setUpdateFormError([]);
          document.getElementById('update_form').reset();
          redirect("/post");
        }
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
    <div className="update-container">
      <h1 className="update-title">Update Post</h1>
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
        <div className="update-form">
          <form className="update-form-container" id="update_form">
            <input id="post_author" type="hidden" name="post_author" defaultValue={post.author._id} required />

            <label htmlFor="post_title">Title:</label>
            <input id="post_title" type="text" placeholder="Post Title" name="post_title" defaultValue={post.title} required />

            <label htmlFor="post_content">Content:</label>
            <textarea id="post_content" type="textarea" placeholder="Post content" name="post_content" defaultValue={post.content} required rows={15} />

            <label htmlFor="is_published">Publish Status:</label>
            <select id="is_published" type="select" placeholder='Publish status' name="is_published" defaultValue={post.is_published} required>
              <option value={true}>Published</option>
              <option value={false}>Unpublished</option>
            </select>

            <button type="submit" className="btn" onClick={(e) => handleUpdatePost(e)} disabled={submitDisabled}>Update</button>
          </form>
        </div>
      )}
        {updateFormError.length !== 0 ? (
          updateFormError.map((error, i) => {
            return <div key={i} className="update-form-error">{error.msg}</div>
          })
          ) : null
        }
    </div>
  );
}

export default UpdatePostPage;