import React, { Component } from 'react';
import axios from 'axios';


import ROOT_URL from '../utils/config.js';

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      error: null,
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
    
    const data = {
      username: this.state.username, 
      password: this.state.password
    };
    
    axios.post(ROOT_URL + 'signin', data)
      .then((result) => {
        if (result.data.username) {
          const username = result.data.username;
          localStorage.token = username;
          this.props.onChange();
          console.log('Sign In successfully!');
          console.log('props: ', this.props.history);
          //this.props.history.push('/');
        } else {
          this.setState({ error: "Error happens when try to sign you in! Please check email and password!"});
          return;
       }  
      })
      .catch((error) => {
        alert('Failed to sign you in!');
        console.log(error);
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
        {this.state.error}
      </div>
    ) 
  }
}

export default SignIn;
