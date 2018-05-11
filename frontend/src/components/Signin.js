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

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSignIn = e => {
    e.preventDefault();
 
    if (this.state.username==='' || this.state.password==='') {
      alert('Please enter username and password');
      return;
    }
 
    axios.post(ROOT_URL + 'signin', {username: this.state.username, password: this.state.password })
      .then((response) => {
        this.props.onChange();
        const username = response.data.username;
        localStorage.token = username;
        console.log('Sign In successfully!');
      })
      .catch((error) => {
        alert('Failed to sign you in!');
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
        <form onSubmit={this.handleSignIn}>
          <div><input type="text" className='form--item' name='username' value={this.state.username} onChange={this.handleInputChange} placeholder="Email Address" required/></div>
          <div><input type="password" className='form--item' name='password' value={this.state.password} onChange={this.handleInputChange} placeholder="Password" required/></div> 
          <button className='button' onClick={this.handleSignIn}>Sign In</button> 
        </form>
      </div>
    ) 
  }
}

export default SignIn;