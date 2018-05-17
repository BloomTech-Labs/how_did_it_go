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
  

  handleInputChange = (e)=> {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleSubmit = e => {
    e.preventDefault();
    
    if (this.state.username===''||this.state.password===''||this.state.confirmPW==='') {
      alert('Please enter all required fields');
      return;
    }
 
    if (this.state.password !== this.state.confirmPW) {
      alert('Password and confirmed Password do not match!!! Please enter one more time.');
    } else {
      axios.post(ROOT_URL + 'signup', {username: this.state.username, password: this.state.password })
        .then((result) => {
          console.log('Sign Up successfully!');
          this.props.history.push('/settings');
        })
        .catch((error) => {
          alert('Failed to sign you up!');
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
      <div className='component'>
        <div className='title'>Sign Up</div>
        <form onSubmit={this.handleSubmit}>
          <div><input type="text" name='username' value={this.state.username} onChange={this.handleInputChange} placeholder="Email Address" required/></div>
          <div><input type="password" name='password' value={this.state.password} onChange={this.handleInputChange} placeholder="Password" required/></div> 
          <div><input type="password" name='confirmPW' value={this.state.confirmPW} onChange={this.handleInputChange} placeholder="Re-enter Password" required/></div>
          <button onClick={this.handleSubmit}>Submit</button> 
        </form>
      </div>
    ) 
  };  
}

export default SignUp;
