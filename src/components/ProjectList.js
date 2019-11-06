import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ProjectList = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    getProjects();
  }, [])

  const getProjects = () => {
    Axios.get('http://localhost:3000/api/projects')
      .then(json => {
        console.log(json.data);
        setData(json.data);
      })
  }

  const [validated, setValidated] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = event => {
    const form = event.currentTarget;
    console.log(form.checkValidity());

    setValidated(true);
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      return;
    }
    addProject();
  };

  const addProject = () => {
    Axios.post('http://localhost:3000/api/projects', {name, description })
      .then(res => {
        console.log('added project');
        setName('')
        setDescription('');
        setValidated(false);
        getProjects();
      })
      .catch(err => {
        console.log(err);
      });
  }

return (
  <Container>
    <Row>
      <Col>
      <h1>ProjectList!</h1>
      {data.map(project => (
        <Link to={`/projects/${project._id}`} key={project._id}>
          <div style={{ border: '3px black solid' }}>
            <h4>Project: {project.name}</h4>
            <p>{project.description}</p>
            <h6>Date Created: {project.dateCreated}</h6>
            <h6>Team:</h6>
            {project.team.map(member => (
              <div key={member._id}>
                {member.user.name}: "{member.message}"
              </div>
            ))}
            <h6>Issues: {project.issues}</h6>
            {project.issues.map(issues => (
              <div key={issues._id}>
                {issues.user.userName}: "{issues.message}"
              </div>
            ))}
            <p>Comments</p>
            {project.comments.map(comment => (
              <div key={comment._id}>
                {comment.user.userName}: "{comment.message}"
              </div>
            ))}
          </div>
          <hr />
        </Link>
      ))}
      </Col>
      <Col>
        <h1>New Project</h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>

          <Form.Group controlId="formBasicUsername">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" required
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)} />
            <Form.Control.Feedback type="invalid">
              Please provide a Name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicUsername">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text"
              placeholder="Project Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>


          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  </Container>
);
}

export default ProjectList;