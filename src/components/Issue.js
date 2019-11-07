import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const Issue = (props) => {
  const issueId = props.match.params.issueId;
  const projId = props.match.params.projectId;
  const history = useHistory();

  const handleDeleteIssue = (e) => {
    axios.put(`http://localhost:3000/api/projects/${projId}/${issueId}/remove`)
      .then(res => {
        console.log('delete issue');
        history.push(`/projects/${projId}`);

      })
      .catch(err => {
        console.log('delete issue failed', err);
      })
  }


  return (
    <div>
      This is {issueId}!!!!
      <Button onClick={handleDeleteIssue} variant={`danger`}>Delete Issue</Button>
    </div>
  );
}

export default Issue;