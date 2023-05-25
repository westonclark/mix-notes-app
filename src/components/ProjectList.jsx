import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import folder from '../assets/folder_FILL0_wght400_GRAD0_opsz48.png';
import addFolder from '../assets/create_new_folder_FILL0_wght400_GRAD0_opsz48.png';

import axios from 'axios';

function ProjectList() {
  const [queryParameters] = useSearchParams();
  const [projects, setProjects] = useState([]);
  const [email, setEmail] = useState(queryParameters.get('email'));
  const navigate = useNavigate();

  function getProjects() {
    axios
      .get('/api/projects')
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        if (error.response.status == 301) navigate('/');
        console.log(error.response);
      });
  }

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div id="projects">
      {/* <h1>Your Projects</h1> */}
      {/* <div id="new-project"> */}
      <button>
        <img src={addFolder}></img> New Project
      </button>
      {/* </div> */}
      <section>
        {projects
          .map((project) => {
            return (
              <article
                key={project.name}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/songs/?email=${email}&projectName=${project.name}&projectId=${project.id}`);
                }}>
                <img src={folder}></img>
                <p>{project.name}</p>
              </article>
            );
          })
          .sort((a, b) => {
            console.log(a);
            if (a.key.toLowerCase() < b.key.toLowerCase()) {
              return -1;
            }
            if (a.key.toLowerCase() > b.key.toLowerCase()) {
              return 1;
            }
            return 0;
          })}
      </section>
    </div>
  );
}

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

export default ProjectList;
