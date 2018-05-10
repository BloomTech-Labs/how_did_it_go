import React, { Component } from 'react';

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
        <div>
          Confirm Password:
          <input type="text" value={this.state.password} onChange={this.handleConfirmPWChange} pleaceholder="Please provide Password" />
        </div> 
      </div>
    ) 
  }
  

  
}

export default SignUp;