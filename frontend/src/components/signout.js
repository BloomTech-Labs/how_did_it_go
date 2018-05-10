import React, { Component } from 'react';
import axios from 'axios';

const URL = "http://localhost:5000/";
class SignOut extends Component {

  componentWillMount() {
    axios.post(URL + 'signout')
        .then(function(response) {
          console.log(response.data);
          console.log('Sign out successfully!');
        })
        .catch(function(error) {
          alert('Failed to sign you out!');
          console.log(error);
        });
  }

  render() {
    return <div>You have signed out</div>;
  }
}

export default SignOut;