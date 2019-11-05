import React, { Component, useState, useEffect } from 'react';
import Axios from 'axios';


const Project = (props) => {
  const projId = props.match.params.projectId;
  const [currentProject, setCurrentProject] = useState([]);

  useEffect(() => {
    getProject();
  }, [])

  const getProject = () => {
    Axios.get(`http://localhost:3000/api/projects/${projId}`)
      .then(json => {
        console.log(json.data);
        setCurrentProject(json.data);
      })
  }

  return (
    <div>
      {projId}
      Woot
    </div>
  );
}

export default Project;