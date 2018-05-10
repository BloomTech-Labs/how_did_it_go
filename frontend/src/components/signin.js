import React, { Component } from 'react';
import axios from 'axios';

const URL = "http://localhost:5000/";

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

    axios.post(URL + 'signin', {username: this.state.username, password: this.state.password })
        .then(function(response) {
          const username = response.data.username;
          localStorage.token = username;
          console.log(localStorage.token);
          console.log('Sign In successfully!');
        })
        .catch(function(error) {
          alert('Failed to sign you in!');
          console.log(error);
        });

    // this.setState({
    //   username: '',
    //   password: '',
    // });
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