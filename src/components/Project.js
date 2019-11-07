import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const Project = (props) => {
  const projId = props.match.params.projectId;
  const [currentProject, setCurrentProject] = useState([]);
  const [loadingProject, setLoadingProject] = useState(true);
  const [otherUsers, setOtherUsers] = useState([]);
  const [addUser, setAddUser] = useState(null);
  const [team, setTeam] = useState([]);

  const [issues, setIssues] = useState([]);
  const [createIssue, setCreateIssue] = useState(false);

  const [validated, setValidated] = useState(false);
  const [name, setName] = useState('');


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
        getProjectIssues();
        setLoadingProject(false);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const getProjectIssues = () => {
    axios.get(`http://localhost:3000/api/issues/${projId}/issues`)
      .then(json => {
        console.log('issues', json.data);
        setIssues(json.data);
      })
      .catch(err => {
        console.log(err);
      })
  };



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

  const handleNewIssueSubmit = event => {
    const form = event.currentTarget;

    setValidated(true);
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      return;
    }

    axios.post(`http://localhost:3000/api/projects/${projId}/issue/add`, { name })
      .then(res => {
        console.log('added issue');
        setName('');
        setValidated(false);
        setCreateIssue(false);
        getProjectIssues();
      })
      .catch(err => {
        console.log(err);
      });
  };


  const newIssueForm = () => {

    return (
      <Form noValidate validated={validated} onSubmit={handleNewIssueSubmit}>

        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" required
            placeholder="Issue Name"
            value={name}
            onChange={(e) => setName(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Please provide a name of issue.
      </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Create
    </Button>
      </Form>
    );
  }


  const renderProject = () => {
    return (
      <div>
        <h1>{currentProject.name}</h1>
        <p>{currentProject.description}</p>
        <h3>Team Members:</h3>
        {addUserDropdown()}
        <Button onClick={handleAddUser}>Add to Team</Button>
        <hr />
        {team.length ?
          <ul> {team.map(member => (
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
        <hr />
        <Button onClick={() => setCreateIssue(true)}>Create Issue</Button>
        {createIssue && newIssueForm()}
        {issues.length ?
          <div> {issues.map(issue => (
            <Link key={issue._id} to={`/projects/${projId}/${issue._id}`}>
              <div  className={'mt-1'} style={{border: '2px gray solid'}}>
                {issue.name}
              </div>
            </Link>
          ))}</div> :
          <div>No Issues Active on Project...</div>
        }
      </div>
    )
  }

  const addUserDropdown = () => {
    let areaDropdownList = [];
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