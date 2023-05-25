import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import folder from '../assets/folder_FILL0_wght400_GRAD0_opsz48.png';
import addFolder from '../assets/create_new_folder_FILL0_wght400_GRAD0_opsz48.png';

import axios from 'axios';

function ProjectList() {
  const [email, setEmail] = useState();
  const [admin, setIsAdmin] = useState(false);

  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  function getProjects() {
    axios
      .get('/api/projects')
      .then((response) => {
        setProjects(response.data.projectList);
        setEmail(response.data.email);
        setIsAdmin(true);
      })
      .catch((error) => {
        if (error.response.status == 301) navigate('login');
        console.log(error.response);
      });
  }

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <nav>
        <ul>
          <li>MIX NOTES</li>
        </ul>
        <ul>
          <li>{email}</li>
        </ul>
      </nav>

      <main className="container">
        <div id="projects">
          <div id="new-project">
            <div>{showForm ? <NewProject getProjects={getProjects} setShowForm={setShowForm}></NewProject> : null}</div>
            <button
              id="show-form"
              className={showForm ? 'secondary' : ''}
              onClick={() => {
                showForm ? setShowForm(false) : setShowForm(true);
              }}>
              New Project
            </button>
          </div>

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
                    <div>
                      <img src={folder}></img>
                      <p>{project.name}</p>
                    </div>
                  </article>
                );
              })
              .sort((a, b) => {
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
      </main>
    </>
  );
}

function NewProject({ getProjects, setShowForm }) {
  const [name, setName] = useState('');
  const [locked, setLocked] = useState(false);
  const [password, setPassword] = useState(null);

  // const navigate = useNavigate();

  function handleSumbit(e) {
    e.preventDefault();
    axios
      .post('/api/projects', { name, password, locked })
      .then((response) => {
        getProjects();
        setShowForm(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  return (
    <div id="create-project">
      <form>
        <input
          type="text"
          id="project-name"
          placeholder="Project Name"
          onChange={(e) => {
            setName(e.target.value);
          }}></input>

        {/* <fieldset>
          <label htmlFor="switch">
            <input
              type="checkbox"
              name="switch"
              role="switch"
              id="switch"
              onClick={() => {
                if (locked) {
                  setLocked(false);
                } else {
                  setLocked(true);
                }
              }}
            />
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
        <div id="login-error" style={{ color: '#FF0000', marginBottom: '20px' }}></div> */}
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
