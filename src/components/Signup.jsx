import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSumbit(e) {
    e.preventDefault();
    axios
      .post('/signup', { email, password })
      .then((response) => {
        console.log(response.data);
        navigate('/home');
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  return (
    <div id="login-shell">
      <div id="login-box">
        <h1>Sign up</h1>
        <form>
          <input
            type="text"
            id="email"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}></input>

          <input
            type="password"
            id="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}></input>

          <button
            type="submit"
            onClick={(e) => {
              handleSumbit(e);
            }}>
            Sign up
          </button>
        </form>
      </div>
      <div id="no-account-box">
        <p>
          Have an account? <Link to="/">Log in</Link>
        </p>
      </div>
    </div>
  );
}
export default Signup;
