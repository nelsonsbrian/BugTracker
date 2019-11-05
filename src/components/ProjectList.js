import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Axios from 'axios';
import { nfcall } from 'q';

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

  const addComment = (event) => {
    event.preventDefault();
    console.log(this.refs.comment.value);

  }





  return (
    <div>
      <h1>React APP!</h1>
      {data.map(project => (
        <Link to={`/projects/${project._id}`} key={project._id}>
          <div style={{ border: '3px black solid' }}>
            <h2>Project: {project.name}</h2>
            <p>{project.description}</p>
            <h4>Date Created: {project.dateCreated}</h4>
            <h4>Team:</h4>
            {project.team.map(member => (
              <div key={member._id}>
                {member.user.name}: "{member.message}"
              </div>
            ))}
            <h4>Issues: {project.issues}</h4>
            {project.issues.map(issues => (
              <div key={issues._id}>
                {issues.user.userName}: "{issues.message}"
              </div>
            ))}
            <h3>Comments</h3>
            {project.comments.map(comment => (
              <div key={comment._id}>
                {comment.user.userName}: "{comment.message}"
              </div>
            ))}
            <form onSubmit={addComment}>
              <input
                type="text"
                id="content"
                placeholder="Add a comment"
              // ref="comment"
              />
              <button className="btn btn-primary" type="submit">
                Post
              </button>
            </form>
          </div>
          <hr />
        </Link>
      ))}
    </div>
  );
}

export default ProjectList;