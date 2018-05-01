import React from 'react';
import { Link } from 'react-router-dom';
import './css/navigation.css';


const Navigation = () => {
  return (
    <div className="links">
      <Link to=''>Home</Link>
      <Link to='/invitations'>Invitations</Link>
      <Link to='/stats'>Stats</Link>
      <Link to='/settings'>Settings</Link>
      <Link to='/team'>Team</Link>
    </div>
  );
}

export default Navigation;