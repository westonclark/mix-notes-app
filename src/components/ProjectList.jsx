import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

function ProjectList() {
  const [projects, setProjects] = useState([]);
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

  const projectComponents = [];
  for (let i = 0; i < projects.length; i++) {
    projectComponents.push(
      <article
        key={projects[i].name}
        onClick={(e) => {
          e.preventDefault();
          navigate(`/songs/?projectName=${projects[i].name}&projectId=${projects[i].id}`);
        }}>
        <a>{projects[i].name}</a>
      </article>
    );
  }

  return (
    <div id="projects">
      <h1>Your Projects</h1>
      <div id="new-project">
        <a href="/newproject" role="button">
          New Project
        </a>
      </div>
      <section className="grid">{projectComponents}</section>
    </div>
  );
}
export default ProjectList;
