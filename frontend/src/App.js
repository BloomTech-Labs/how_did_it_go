import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import {StripeProvider} from 'react-stripe-elements';

import './App.css';
import './components/css/standardComponent.css';
import './components/css/form.css';
import './components/css/customerStats.css';

import Navigation from './components/Navigation';
import Home from './components/Home';
import Invitations from './components/Invitations';
import Stats from './components/Stats';
import Settings from './components/Settings';
import Team from './components/Team';
import SignUp from './components/signup';
import SignIn from './components/signin';
import SignOut from './components/signout';

import logo from './images/HIGTextLogoQMTransparent.png';


class App extends Component {

  render() {
    return (
      <div>
        <img src={logo} className='logo' alt="How'd It Go" />
        <Navigation />
        <Route path='/' exact     component={Home}  />
        <Route path='/signup'     component={SignUp} />
        <Route path='/signin'     component={SignIn} />
        <Route path='/signout'     component={SignOut} />
        <Route path='/invitations'component={Invitations} />
        <Route path='/stats'      component={Stats} />
      <StripeProvider apiKey="pk_test_lYWOs3y88CPr5JkrwkMt7Cvr">
        <Route path='/settings'   component={Settings} />
      </StripeProvider>
        <Route path='/team'       component={Team} />
      </div>
    );
  }
   
}

export default App;
