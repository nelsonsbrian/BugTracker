import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import axios from 'axios';
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
    axios.get('http://localhost:3000/api/users')
      .then(json => {
        console.log(json.data);
        setData(json.data);
      })
  }

  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  const handleSubmit = event => {
    const form = event.currentTarget;

    setValidated(true);
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      return;
    }
    addUser();
  };

  const addUser = () => {
    axios.post('http://localhost:3000/api/users', { name, userName: username, password, email })
      .then(res => {
        console.log('added user');
        setUsername('')
        setPassword('');
        setName('');
        setEmail('');
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
          <h1>UserList!</h1>
          {!data.length && <div>No Users in DB</div>}
          {data.length > 0 && data.map(user => (
            <Link to={`/users/${user._id}`} key={user._id}>
              <div style={{ border: '3px black solid' }}>
                <h5>{user.name}</h5> Username: {user.userName}
                <p>{user.email}</p>
                <h6>Last Login: {user.lastLogin}</h6>
                <h6>Admin: {user.isAdmin.toString()}</h6>

              </div>
              <hr />
            </Link>
          ))}
        </Col>
        <Col>
          <h1>New User</h1>
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
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" required
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
              <Form.Control.Feedback type="invalid">
                Please provide a username.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" required
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
              <Form.Control.Feedback type="invalid">
                Please provide a email.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
              <Form.Control.Feedback type="invalid">
                Please provide a valid password.
              </Form.Control.Feedback>
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