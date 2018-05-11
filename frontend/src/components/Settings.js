import React, { Component } from 'react';

import Billing from './settingsComponents/Billing';
import Message from './settingsComponents/Message';
import Payment from './settingsComponents/Payment';
import UsernameAndPassword from './settingsComponents/UsernameAndPassword';


class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.user,
      currentItem: 0,
      items: [
        <Message />,
        <UsernameAndPassword />,
        <Billing />,
        <Payment />,
      ],
    };
  }

  toggleItem = (e) => {
    this.setState({
      currentItem: e.target.name,
    })
  }

  render() {
    console.log('current user is: ', this.props.user); //just for testing, but this works!!
    return (
    <div className='component'>
      <button type='button' name='0' onClick={this.toggleItem}>Messages</button>
      <button type='button' name='1' onClick={this.toggleItem}>Update Username and Password</button>
      <button type='button' name='2' onClick={this.toggleItem}>Update Billing Info</button>
      <button type='button' name='3' onClick={this.toggleItem}>Make a Payment</button>

      <div>
        {this.state.items[this.state.currentItem]}
      </div>
   
    </div> 
    );
  }
  
}

export default Settings;
