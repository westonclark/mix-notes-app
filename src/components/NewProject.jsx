import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function NewProject() {
  const [name, setName] = useState('');
  const [locked, setLocked] = useState(false);
  const [password, setPassword] = useState(null);

  const navigate = useNavigate();

  function handleSumbit(e) {
    console.log(name, password, locked);
    e.preventDefault();
    axios
      .post('/api/projects', { name, password, locked })
      .then((response) => {
        console.log(response);
        navigate('/home');
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  function toggleLocked() {
    if (locked) {
      setLocked(false);
    } else {
      setLocked(true);
    }
  }

  return (
    <div id="create-project">
      <h1>New Project</h1>
      <form>
        <input
          type="text"
          id="project-name"
          placeholder="Project Name"
          onChange={(e) => {
            setName(e.target.value);
          }}></input>

        <fieldset>
          <label htmlFor="switch">
            <input type="checkbox" name="switch" role="switch" id="switch" onClick={() => toggleLocked()} />
            Password Protected
          </label>
        </fieldset>

        <input
          type="password"
          id="password"
          placeholder="Password"
          style={locked ? {} : { display: 'none' }}
          onChange={(e) => {
            setPassword(e.target.value);
          }}></input>
        <div id="login-error" style={{ color: '#FF0000', marginBottom: '20px' }}></div>
        <button
          type="submit"
          onClick={(e) => {
            handleSumbit(e);
          }}>
          Create Project
        </button>
      </form>
    </div>
  );
}
export default NewProject;
