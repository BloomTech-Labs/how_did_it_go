import axios from 'axios';
import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

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
import SignUp from './components/Signup';
import SignIn from './components/Signin';
import SignOut from './components/Signout';

import logo from './images/HIGTextLogoQMTransparent.png';

// globally config axios to let auth pass cookies down
axios.defaults.withCredentials = true;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: localStorage.token,
      currentUser: null,
    };
  }

  onSignInChange = () => {
    this.setState({
      authenticated: true,
      currentUser: localStorage.token,
    });
  }

  onSignOutChange = () => {
    this.setState({
      authenticated: false,
      currentUser: null,
    });
  }

  render() {
    return (
        <BrowserRouter>
        <div>
            <img src={logo} className='logo' alt='logo' />
            <Navigation authenticated={this.state.authenticated} user={this.state.currentUser} />
            <Route path='/' exact     component={Home}  />
            <Route path='/signup'     render={(props) => <SignUp {...props} />} />
            <Route path='/signin'     render={(props) => <SignIn {...props} onChange={this.onSignInChange} />} />
            <Route path='/signout'    render={() => <SignOut onChange={this.onSignOutChange} />} />
            <Route path='/invitations'render={(props) => <Invitations {...props} user={this.state.currentUser} />} />
            <Route path='/stats'      render={(props) => <Stats {...props} user={this.state.currentUser}/>} />
          <StripeProvider apiKey="pk_test_lYWOs3y88CPr5JkrwkMt7Cvr">
            <Route path='/settings'   render={(props) => <Settings {...props} user={this.state.currentUser} />} />
          </StripeProvider>
            <Route path='/team'       component={Team} />
          </div>
        </BrowserRouter>
    );
  }
   
}

export default App;
