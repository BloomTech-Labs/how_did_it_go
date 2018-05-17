import React, { Component } from 'react';
import ROOT_URL from '../utils/config.js';

import Billing from './settingsComponents/Billing';
import Message from './settingsComponents/Message';
import PlatForms from './settingsComponents/PlatForms';
import Payment from './settingsComponents/Payment';
import UsernameAndPassword from './settingsComponents/UsernameAndPassword';
import ReviewSites from './settingsComponents/PlatForms';


class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.user,
      currentItem: 0,
      items: [
        <PlatForms user={this.props.user}/>,
        <Message user={this.props.user}/>,
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
      <div className='sidebar'>
        <div className='title header'>Settings</div>
        <button type='button' className='button sidebar--button' name='0' onClick={this.toggleItem}>Review Sites</button>
        <button type='button' className='button sidebar--button' name='1' onClick={this.toggleItem}>Messages</button>
        <button type='button' className='button sidebar--button' name='2' onClick={this.toggleItem}>Update Username and Password</button>
        <button type='button' className='button sidebar--button' name='3' onClick={this.toggleItem}>Update Billing Info</button>
        <button type='button' className='button sidebar--button' name='4' onClick={this.toggleItem}>Make a Payment</button>
      </div>

      <div className='settings--mainScreen'>
        {this.state.items[this.state.currentItem]}
      </div>
   
    </div> 
    );
  }
  
}

export default Settings;
