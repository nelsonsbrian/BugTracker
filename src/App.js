import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Project from './components/Project';
import ProjectList from './components/ProjectList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }
  // componentDidMount() {
  //   axios.get('http://localhost:3000/api/projects')
  //     .then(json => {
  //       console.log(json.data);
  //       this.setState({ data: json.data });
  //     })
  // }

  // addComment(event) {
  //   event.preventDefault();
  //   console.log(this.refs.comment.value);
  // }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact={true} path="/projects/" component={ProjectList} />
          <Route path="/projects/:projectId" component={Project} />
        </div>
      </Router>
    );
  }
}

export default App;
