import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProjectList() {
  const [projects, serProjects] = useState([]);

  function getProjects() {
    axios
      .get('/projects')
      .then((response) => {
        console.log(response);
        serProjects(response.data);
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
    projectComponents.push(<button key={projects[i].name}>{projects[i].name}</button>);
  }
  return (
    <>
      <h1>Your Projects</h1>
      {projectComponents}
    </>
  );
}
export default ProjectList;
