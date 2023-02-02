import React, { useState, useEffect } from 'react';
import { redirect } from "react-router-dom";
import '../styles/LoginPage.css';

function LoginPage() {
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [loginFormError, setLoginFormError] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    setSubmitDisabled(true);

    const data = new URLSearchParams();
    for (const pair of new FormData(document.getElementById('login_form'))) {
      data.append(pair[0], pair[1]);
    }

    fetch('https://mraffia-odin-blog-api.up.railway.app/login', {
      method: 'POST',
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message === 'Something is not right') {
          setLoginFormError(true);
        } else {
          localStorage.setItem("user_name", data.user.name);
          localStorage.setItem("user_token", data.token);
          setLoginFormError(false);
          document.getElementById('login_form').reset();
          redirect("/");
        }
        console.log(localStorage.getItem("user_name"));
        console.log(localStorage.getItem("user_token"));
        setSubmitDisabled(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Log In</h1>
      {loginFormError ? (
        <div className="login-form-error">Invalid username or password.</div>
        ) : null
      }
      <div className="login-form">
        <form className="login-form-container" id="login_form">
          <label htmlFor="username">Username:</label>
          <input id="username" type="text" placeholder="Username" name="username" required />

          <label htmlFor="password">Password:</label>
          <input id="password" type="password" name="password" required />

          <button type="submit" className="btn" onClick={(e) => handleLogin(e)} disabled={submitDisabled}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;