import React from 'react';
import '../styles/PostCard.css';

function PostCard({ post }) {

  function dateFormatter(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    let newDate = new Date(date);

    return newDate.toLocaleDateString("en-GB", options)
  }

  function titleShortener(title) {
    if (title.length < 30) {
      return title;
    } else {
      return title.slice(0, 30) + "...";
    }
  }

  function contentShortener(content) {
    if (content.length < 50) {
      return content;
    } else {
      return content.slice(0, 50) + "...";
    }
  }

  return (
    <div className="card-container">
      <div className="card-content-container">
        <div className="card-post-title">{titleShortener(post.title)}</div>
        <div className="card-post-content">{contentShortener(post.content)}</div>
      </div>
      <div className="card-info-container">
        <div className="card-post-author">{post.author.name}</div>
        <div className="card-post-date">At {dateFormatter(post.timestamp)}</div>
      </div>
    </div>
  );
}

export default PostCard;