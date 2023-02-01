import React, { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import '../styles/PostPage.css';

function PostPage({ postid }) {
  const [post, setPost] = useState({
    "_id": "",
    "author": {},
    "title": "",
    "content": "", 
    "is_published": true, 
    "timestamp": "",
  });
  const [comments, setComments] = useState([]);
  const [isLoadingPost, setIsLoadingPost] = useState(false);
  const [isErrorPost, setIsErrorPost] = useState(false);
  const [commentFormDisplay, setCommentFormDisplay] = useState("none");
  const [commentFormError, setCommentFormError] = useState([]);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  function dateFormatter(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    let newDate = new Date(date);

    return newDate.toLocaleDateString("en-GB", options)
  }

  function toggleCommentFormDisplay() {
    if (commentFormDisplay === "none") {
      setCommentFormDisplay("block");
    } else if (commentFormDisplay === "block") {
      setCommentFormDisplay("none");
    }
  }

  function handleSubmitComment(e) {
    e.preventDefault();
    setSubmitDisabled(true);

    const data = new URLSearchParams();
    for (const pair of new FormData(document.getElementById('comment_form'))) {
      data.append(pair[0], pair[1]);
    }

    fetch('https://mraffia-odin-blog-api.up.railway.app/comments', {
      method: 'POST',
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          setCommentFormError(data.errors);
        } else {
          let newComments = [...comments];
          newComments.unshift(data.comment);
          setComments(newComments);

          setCommentFormError([]);
          setCommentFormDisplay("none");
          document.getElementById('comment_form').reset();
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

    fetch('https://mraffia-odin-blog-api.up.railway.app/posts/' + postid)
      .then((response) => response.json())
      .then((data) => {
        setPost(data.post);
        setComments(data.comments);
        setIsLoadingPost(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsErrorPost(false);
      });
  }, []);

  return (
    <div className="post-container">
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
        <div className="post-subcontainer">
          <h1 className="post-title">{post.title}</h1>
          <div className="post-info">By <b>{post.author.name}</b> at {dateFormatter(post.timestamp)}</div>
          <hr />
          <div className="post-content">{post.content}</div>
          <hr />

          <button className="comment-form-open" onClick={() => toggleCommentFormDisplay()}>Post a comment</button>
          <div className="comment-form-popup" style={{ display: commentFormDisplay }}>
            <form className="comment-form-container" id="comment_form">
              <input id="post" type="hidden" name="post" value={postid} required />

              <label htmlFor="comment_author">Name:</label>
              <input id="comment_author" type="text" placeholder="Your name" name="comment_author" required />

              <label htmlFor="comment_content">Content:</label>
              <input id="comment_content" type="text" placeholder="Comment content" name="comment_content" required />

              <button type="submit" className="btn" onClick={(e) => handleSubmitComment(e)} disabled={submitDisabled}>Submit</button>
            </form>
          </div>

          {commentFormError.length !== 0 ? (
            commentFormError.map((error, i) => {
              return <div key={i} className="comment-form-error">{error.msg}</div>
            })
            ) : (
            null
          )}

          <h2 className="post-comment-heading">Comments</h2>
          <div className="comment-list-container">
            {comments.length !== 0 ? 
              comments.map((comment, i) => {
                return (
                  <div key={i} className="comment-container">
                    <div className="comment-author"><b>{comment.author}</b></div>
                    <div className="comment-content">{comment.content}</div>
                    <div className="comment-date">{dateFormatter(comment.timestamp)}</div>
                  </div>
                )
              }) : (
              <div className="comment-absent">There are no comments on this post.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PostPage;