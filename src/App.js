import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Project from './components/Project';
import ProjectList from './components/ProjectList';
import UserList from './components/UserList';
import NavBar from "./components/NavBar";
import { useAuth0 } from "./react-auth0-spa";
import Profile from "./components/Profile";
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';

function App() {

  return (
    <Router>
      <div className="App">
        <NavBar/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route exact={true} path="/projects" component={ProjectList} /> 
          <Route path="/projects/:projectId" component={Project} />
          <Route path="/users" component={UserList} />
        </Switch>
      </div>
    </Router>
  );

}

export default App;
