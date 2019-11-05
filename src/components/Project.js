import React, { Component, useState, useEffect } from 'react';
import Axios from 'axios';


const Project = (props) => {
  const projId = props.match.params.projectId;
  const [currentProject, setCurrentProject] = useState([]);
  const [loadingProject, setLoadingProject] = useState(true);

  useEffect(() => {
    getProject();
  }, [])

  const getProject = () => {
    Axios.get(`http://localhost:3000/api/projects/${projId}`)
      .then(json => {
        console.log(json.data);
        setCurrentProject(json.data);
        setLoadingProject(false);
      })
  }

  const renderProject = () => {
    return (
      <div>
        <h1>{currentProject.name}</h1>
        <p>{currentProject.description}</p>
        <h3>Team Members:</h3>
        {currentProject.team.length ?
          <ul> {currentProject.team.map(member => (
            <li key={member.id}>{member.name}</li>
          ))}</ul> :
          <div>No Team Members on Project...</div>
        }
      </div>
    )
  }

  const AddTeamMember = () => {
    
  }
  

  return (
    <div>
      {loadingProject ? <h2>Loading Project....</h2> : renderProject()}
      {/* {currentProject && renderProject()} */}
    </div>
  );
}

export default Project;