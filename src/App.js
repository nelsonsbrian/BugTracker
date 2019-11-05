import React, { Component } from 'react';
// import axios from 'axios';
import './App.css';
// import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
// import Project from './components/Project';
// import ProjectList from './components/ProjectList';
// import { Modal, Button } from 'react-bootstrap';
// import NavBar from "./components/NavBar";
// import { useAuth0 } from "./react-auth0-spa";

class App extends Component {
  constructor() {
    super();
  }
  // addComment(event) {
  //   event.preventDefault();
  //   console.log(this.refs.comment.value);
  // }

  render() {
    return (
      // <Router>
      // {/* <NavBar /> */}
      //   {/* <Modal.Dialog>
      //   <Modal.Header closeButton>
      //     <Modal.Title>Modal title</Modal.Title>
      //   </Modal.Header>

      //   <Modal.Body>
      //     <p>Modal body text goes here.</p>
      //   </Modal.Body>

      //   <Modal.Footer>
      //     <Button variant="secondary">Close</Button>
      //     <Button variant="primary">Save changes</Button>
      //   </Modal.Footer>
      // </Modal.Dialog> */}

      <div className="App">
        test
          {/* <Route exact={true} path="/" component={ProjectList} /> */}
        {/* <Route exact={true} path="/projects/" component={ProjectList} />
          <Route path="/projects/:projectId" component={Project} /> */}
      </div>
      // </Router>
    );
  }
}

export default App;
