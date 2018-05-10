import React, { Component } from 'react';
import axios from 'axios';

import ROOT_URL from '../utils/config.js';

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      confirmPW: '',
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

  handleConfirmPWChange = e => {
    this.setState({
      confirmPW: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.password !== this.state.confirmPW) {
      alert('Password and confirmed Password do not match!!! Please enter one more time.');
    } else {
      axios.post(ROOT_URL + 'signup', {username: this.state.username, password: this.state.password })
        .then(function(response) {
          console.log('hello world');
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    this.setState({
      username: '',
      password: '',
      confirmPW: '',
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
        <div>
          Confirm Password:
          <input type="text" value={this.state.confirmPW} onChange={this.handleConfirmPWChange} pleaceholder="Please provide Password" />
        </div>
        <button onClick={this.handleSubmit}>Submit</button> 
      </div>
    ) 
  };  
}

export default SignUp;