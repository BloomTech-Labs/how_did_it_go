import React, { Component } from 'react';
import axios from 'axios';

const URL = "http://localhost:5000/";

class SignOut extends Component {
  
  componentDidMount() {
    axios.post(URL + 'signout')
        .then((response) => {
          this.props.onChange();
          delete localStorage.token;
          console.log('Sign out successfully!');
        })
        .catch((error) => {
          alert('Failed to sign you out!');
          console.log(error);
        });
  }

  render() {
    return <div>You have signed out</div>;
  }
}

export default SignOut;