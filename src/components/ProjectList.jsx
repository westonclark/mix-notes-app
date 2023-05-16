import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProjectList() {
  const [projects, setProjects] = useState([]);

  function getProjects() {
    axios
      .get('/api/projects')
      .then((response) => {
        console.log(response);
        setProjects(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  useEffect(() => {
    getProjects();
  }, []);

  const projectComponents = [];

  for (let i = 0; i < projects.length; i++) {
    projectComponents.push(
      <div className="project-shell" key={projects[i].name}>
        <button className="project-button">{projects[i].name}</button>
        <p>
          locked: <span className="locked-status">{projects[i].locked.toString()}</span>
        </p>
      </div>
    );
  }
  return (
    <div id="projects-shell">
      <h1>Your Projects</h1>
      <div id="new-project-header">
        <button id="new-project">New Project</button>
      </div>
      <div id="projects-display">{projectComponents}</div>
    </div>
  );
}
export default ProjectList;
