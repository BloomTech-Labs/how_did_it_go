import React from 'react';
import { Link } from 'react-router-dom';
import Home from './Home';
import Invitations from './Invitations';
import Stats from './Stats';
import Settings from './Settings';
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