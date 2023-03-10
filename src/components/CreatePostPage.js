import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/CreatePostPage.css';

function CreatePostPage({ handleCurrentPost, handlePostsEdited }) {
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [createFormError, setCreateFormError] = useState([]);
  const [unauthorized, setUnauthorized] = useState(false);

  const navigate = useNavigate();

  function handleCreatePost(e) {
    e.preventDefault();
    setSubmitDisabled(true);

    const data = new URLSearchParams();
    for (const pair of new FormData(document.getElementById('create_form'))) {
      data.append(pair[0], pair[1]);
    }

    fetch('https://mraffia-odin-blog-api.up.railway.app/posts', {
      method: 'POST',
      body: data,
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
        if (data.errors) {
          setCreateFormError(data.errors);
        } else {
          handleCurrentPost(data.post._id);
          handlePostsEdited('create');
          setCreateFormError([]);
          document.getElementById('create_form').reset();
          navigate("/post");
        }
        setSubmitDisabled(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="create-container">
      <h1 className="create-title">Create New Post</h1>
      <div className="create-form">
        <form className="create-form-container" id="create_form">
          <input id="post_author" type="hidden" name="post_author" value={"63d697f26795908285c08e65"} required />

          <label htmlFor="post_title">Title:</label>
          <input id="post_title" type="text" placeholder="Post Title" name="post_title" required />

          <label htmlFor="post_content">Content:</label>
          <textarea id="post_content" type="textarea" placeholder="Post content" name="post_content" required rows={15} />

          <label htmlFor="is_published">Publish Status:</label>
          <select id="is_published" type="select" placeholder='Publish status' name="is_published" required>
            <option value={true}>Published</option>
            <option value={false}>Unpublished</option>
          </select>

          <button type="submit" className="btn" onClick={(e) => handleCreatePost(e)} disabled={submitDisabled}>Create</button>
        </form>
      </div>
      {unauthorized ? (
        <div className="create-form-error">User access token expired. Please logout and re-login to continue creating a new post.</div>
      ) : (
        null
      )}
      {createFormError.length !== 0 ? (
        createFormError.map((error, i) => {
          return <div key={i} className="create-form-error">{error.msg}</div>
        })
      ) : ( 
        null
      )}
    </div>
  );
}

export default CreatePostPage;