import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  function getProjects() {
    axios
      .get('/api/project')
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
      <article key={projects[i].name}>
        <a
          href="/"
          // role="button"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/songs/?projectId=${projects[i].name}`);
          }}>
          {projects[i].name}
        </a>
      </article>
    );
  }

  return (
    <>
      <h1>Your Projects</h1>
      <section className="grid">{projectComponents}</section>
      <button>New Project</button>
    </>
  );
}
export default ProjectList;
