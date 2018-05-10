import React, { Component } from 'react';import axios from 'axios';

import ROOT_URL from '../utils/config.js';

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
    };
  }
  
  handleUsernameChange = e => {
    this.setState({
      username: e.target.value
    });
  };

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleSignIn = e => {
    e.preventDefault();

    axios.post(ROOT_URL + 'signin', {username: this.state.username, password: this.state.password })
        .then(function(response) {
          console.log('hello world');
        })
        .catch(function(error) {
          console.log(error);
        });

    this.setState({
      username: '',
      password: '',
    });
  }

  render() {
    return (
      <div className='component'>
        <div className='title'>Sign In</div>
        <div>
          <input type="text" className='form--item' value={this.state.username} onChange={this.handleUsernameChange} placeholder="Email Address" />
        </div>
        <div>
          <input type="password" className='form--item' value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password" />
        </div> 
        <button className='button' onClick={this.handleSignIn}>Sign In</button> 
      </div>
    ) 
  }
}

export default SignIn;