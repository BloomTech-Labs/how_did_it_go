import React from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Invitations from './components/Invitations';
import Stats from './components/Stats';
import Settings from './components/Settings';
import {Route} from 'react-router-dom';



const App = () => {
  return (
    <div >
      <Navigation />
      <Route path='/' component={Home} exact />
      <Route path='/Invitations' component={Invitations} />
      <Route path='/Stats' component={Stats} />
      <Route path='/Settings' component={Settings} />
    </div>
  ); 
}

export default App;
