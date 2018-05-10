import React, { Component } from 'react';

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
      </div>
    ) 
  }
}

export default SignIn;