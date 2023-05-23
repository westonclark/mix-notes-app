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
      .post('/api/signup', { email, password })
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
    <div id="signup">
      <h1>Sign up</h1>

      <form>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}></input>

        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}></input>

        <div id="signup-error" style={{ color: '#FF0000', marginBottom: '20px', textAlign: 'center' }}></div>

        <button
          type="submit"
          onClick={(e) => {
            handleSumbit(e);
          }}>
          Sign up
        </button>
      </form>

      <p>
        Already have an account? <Link to="/">Log in</Link>
      </p>
    </div>
  );
}
export default Signup;
