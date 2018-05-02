import React from 'react';
import {Route} from 'react-router-dom';

import './App.css';
import './components/css/standardComponent.css';
import './components/css/form.css';
<<<<<<< HEAD
import './components/css/customerStats.css';
=======
>>>>>>> 20e3e105ed90f3c82b7aff9955ac7ae27e273f49

import Navigation from './components/Navigation';
import Home from './components/Home';
import Invitations from './components/Invitations';
import Stats from './components/Stats';
import Settings from './components/Settings';
import Team from './components/Team';



const App = () => {
  return (
    <div>
      <Navigation />
      <Route path='/' exact     component={Home}  />
      <Route path='/invitations'component={Invitations} />
      <Route path='/stats'      component={Stats} />
      <Route path='/settings'   component={Settings} />
      <Route path='/team'       component={Team} />
    </div>
  ); 
}

export default App;
