import React from 'react';
import {Route} from 'react-router-dom';

import './App.css';
import './components/css/standardComponent.css';
import './components/css/form.css';

import Navigation from './components/Navigation';
import Home from './components/Home';
import Invitations from './components/Invitations';
import Stats from './components/Stats';
import Settings from './components/Settings';



const App = () => {
  return (
    <div>
      <Navigation />
      <Route path='/' exact     component={Home}  />
      <Route path='/Invitations'component={Invitations} />
      <Route path='/Stats'      component={Stats} />
      <Route path='/Settings'   component={Settings} />
    </div>
  ); 
}

export default App;
