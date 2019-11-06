import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const Project = (props) => {
  const projId = props.match.params.projectId;
  const [currentProject, setCurrentProject] = useState([]);
  const [loadingProject, setLoadingProject] = useState(true);
  const [otherUsers, setOtherUsers] = useState([]);
  const [addUser, setAddUser] = useState(null);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    getProject();
  }, [])

  const getProject = () => {
    axios.get(`http://localhost:3000/api/projects/${projId}`)
      .then(json => {
        console.log(json.data);
        setCurrentProject(json.data);
        getOtherUsers();
        getProjectUsers();
        setLoadingProject(false);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const getProjectUsers = () => {
    axios.get(`http://localhost:3000/api/users/${projId}/team`)
      .then(json => {
        console.log('team', json.data);
        setTeam(json.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const getOtherUsers = () => {
    axios.get(`http://localhost:3000/api/users/${projId}/other`)
      .then(json => {
        console.log('not on team', json.data);
        setOtherUsers(json.data);
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
        {addUserDropdown()}
        <Button onClick={handleAddUser}>Add to Team</Button>
        {team.length ?
          <ul> {team.map((member, index) => (
            <li key={member.userName}>
              <div className={'mt-1'}>
                {member.name}
                <Button onClick={() => handleRemoveUser(member._id)}
                  variant={'danger'}
                  className={'ml-2'}
                >Remove</Button>
              </div>
            </li>
          ))}</ul> :
          <div>No Team Members on Project...</div>
        }
      </div>
    )
  }

  const addUserDropdown = () => {
    let areaDropdownList = [];
    console.log(otherUsers);
    for (let user of otherUsers) {
      areaDropdownList.push(<option key={user.userName} value={user._id}>{user.userName}</option>)
    }
    return (
      <select
        id="areaDropdown"
        className="custom-select"
        value={(addUser) ? addUser.userName : ""}
        onChange={(e) => setAddUser(e.target.value)}
      >
        <option value="" disabled hidden>Add Team Member</option>
        {areaDropdownList}
      </select>
    );
  }

  const handleAddUser = () => {
    if (!addUser) { return };
    axios.post(`http://localhost:3000/api/projects/${projId}/user/add`, { addUser })
      .then(json => {
        console.log(`added ${addUser}`);
        setCurrentProject(json.data);
        setAddUser(null);
        getOtherUsers();
        getProjectUsers();
      })
      .catch(err => {
        console.log(err);
      })
  }

  const handleRemoveUser = (userId) => {
    axios.put(`http://localhost:3000/api/projects/${projId}/user/remove`, { userId })
      .then(json => {
        console.log(`removed ${userId}`);
        setCurrentProject(json.data);
        getOtherUsers();
        getProjectUsers();
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div>
      {loadingProject ? <h2>Loading Project....</h2> : renderProject()}
    </div>
  );
}

export default Project;