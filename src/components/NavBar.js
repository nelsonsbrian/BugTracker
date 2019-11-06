import React from "react";
import { Link } from 'react-router-dom';

const NavBar = () => {

  return (
    <div>
      <span>
        <Link to="/">Home</Link>&nbsp;|&nbsp;
          <Link to="/projects">Projects</Link>&nbsp;|&nbsp;
          <Link to="/users">Users</Link>
      </span>

    </div>
  );
};

export default NavBar;