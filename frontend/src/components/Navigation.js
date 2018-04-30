import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.css';


const Navigation = () => {
  return (
    <div className="links">
      <Link to=''>Home</Link>
      <Link to='/Invitations'>Invitations</Link>
      <Link to='/Stats'>Stats</Link>
      <Link to='/Settings'>Settings</Link>
    </div>
  );
}

export default Navigation;