import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSumbit(e) {
    e.preventDefault();
    axios
      .post('/api/login', { email, password })
      .then((response) => {
        if (response.data.match) {
          navigate('/home');
        }
      })
      .catch((error) => {
        document.getElementById('login-error').innerHTML = error.response.data;
        console.log(error.response.data);
      });
  }

  return (
    <div id="login-shell">
      <div id="login-box">
        <h1>Log in</h1>
        <div id="login-error"></div>
        <form>
          <input
            type="text"
            id="login-email"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}></input>

          <input
            type="password"
            id="login-password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}></input>
          <button
            type="submit"
            onClick={(e) => {
              handleSumbit(e);
            }}>
            Log in
          </button>
        </form>
      </div>
      <div id="no-account-box">
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
