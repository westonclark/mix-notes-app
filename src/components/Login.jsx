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
          navigate(`/home/?email=${response.data.email}`);
        }
      })
      .catch((error) => {
        document.getElementById('login-error').innerHTML = error.response.data;
        console.log(error.response.data);
      });
  }

  return (
    <div id="login">
      <h1>Log in</h1>

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

        <div id="login-error" style={{ color: '#FF0000', marginBottom: '20px', textAlign: 'center' }}></div>

        <button
          type="submit"
          onClick={(e) => {
            handleSumbit(e);
          }}>
          Log in
        </button>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
export default Login;
