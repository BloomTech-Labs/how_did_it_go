import React, { Component } from 'react';import axios from 'axios';

import ROOT_URL from '../utils.config.js';

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
      <div>
        <div>
          Email:
          <input type="text" value={this.state.username} onChange={this.handleUsernameChange} pleaceholder="Please provide Email" />
        </div>
        <div>
          Password:
          <input type="text" value={this.state.password} onChange={this.handlePasswordChange} pleaceholder="Please provide Password" />
        </div> 
        <button onClick={this.handleSignIn}>Sign In</button> 
      </div>
    ) 
  }
}

export default SignIn;