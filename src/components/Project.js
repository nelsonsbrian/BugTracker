import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Project = (props) => {
  const projId = props.match.params.projectId;
  const [currentProject, setCurrentProject] = useState([]);
  const [loadingProject, setLoadingProject] = useState(true);
  const [otherUsers, setOtherUsers] = useState([]);
  const [addUser, setAddUser] = useState(null)

  useEffect(() => {
    getProject();
  }, [])


  const getProject = () => {
    axios.get(`http://localhost:3000/api/projects/${projId}`)
      .then(json => {
        console.log(json.data);
        setCurrentProject(json.data);
        getOtherUsers(json.data);
        setLoadingProject(false);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const getOtherUsers = (proj) => {
    // if (!currentProject.team.length) { return };
    axios.get(`http://localhost:3000/api/users/`)
      .then(json => {
        const others = json.data.filter(u => !proj.team.find(t => t.userName === u.userName));
        setOtherUsers(others);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const renderProject = () => {
    return (
      <div>
        <h1>{currentProject.name}</h1>
        <p>{currentProject.description}</p>
        <h3>Team Members:</h3>
        {generateAreaDropdown()}
        {currentProject.team.length ?
          <ul> {currentProject.team.map(member => (
            <li key={member.userName}>{member.name}</li>
          ))}</ul> :
          <div>No Team Members on Project...</div>
        }
      </div>
    )
  }

  const generateAreaDropdown = () => {
    let areaDropdownList = [];
    for (let user of otherUsers) {
      areaDropdownList.push(<option key={user.userName} value={user.userName}>{user.userName}</option>)
    }
    return (
      <select
        id="areaDropdown"
        className="custom-select"
        value={(addUser) ? addUser : ""}
        onChange={(e) => setAddUser(e.target.value)}
      >
        <option value="" disabled hidden>Add Team Member</option>
        {areaDropdownList}
      </select>
    );
  }

  return (
    <div>
      {loadingProject ? <h2>Loading Project....</h2> : renderProject()}
      {/* {currentProject && renderProject()} */}
    </div>
  );
}

export default Project;