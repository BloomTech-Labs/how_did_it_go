import React, { Component } from 'react';
import axios from 'axios';

import ROOT_URL from '../utils/config.js';

class SignOut extends Component {
  
  componentDidMount() {
    axios.post(ROOT_URL + 'signout')
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
    return <div className='title'>You have signed out</div>;
  }
}

export default SignOut;