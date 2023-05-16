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
        if (response.data.match) {
          navigate('/home');
        }
      })
      .catch((error) => {
        document.getElementById('signup-error').innerHTML = error.response.data;
        console.log(error.response.data);
      });
  }

  return (
    <div id="signup-shell">
      <div id="signup-box">
        <h1>Sign up</h1>
        <div id="signup-error"></div>

        <form>
          <input
            type="text"
            id="signup-email"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}></input>

          <input
            type="password"
            id="signup-password"
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
      <div id="already-have-account-box">
        <p>
          Have an account? <Link to="/">Log in</Link>
        </p>
      </div>
    </div>
  );
}
export default Signup;
