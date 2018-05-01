import React, { Component } from 'react';

class Settings extends Component {
  constructor () {
    super();

    this.state = {
      managerName: '',
      businessName: '',
      oldPW: '',
      newPW: '',
    };
  }

  handleManagerNameChange = (e) => {
    this.setState({
      managerName: e.target.value
    });
  }

  handleBusinessNameChange = (e) => {
    this.setState({
      businessName: e.target.value
    });
  }

  handleOldPWChange = (e) => {
    this.setState({
      oldPW: e.target.value
    });
  }

  handleNewPWChange = (e) => {
    this.setState({
      newPW: e.target.value
    });
  }

  render() {
    return (
    <div className='component'>
      <div className='title'>Create Your Personalized Message</div>
      <div>Here is Our Basic Greeting. Feel Free To Change It However You'd Like!</div>
      <div>
        Message Content:
        <p>Hey, this is {this.state.managerName ? this.state.managerName : 'Your Name Here'} from {this.state.businessName ? this.state.businessName : 'Your Business\' Name Here'}. 
        Thank you for coming in today! I hope you enjoyed your visit and will come see us again soon. 
        In the meantime, could you do me a personal favor and leave us a review? Here is a link that will make it easy: {'Your Link Here'}</p>
      </div>
      <form className='form' id='settingsForm'>
        <input className='form--item' type='text' placeholder='Manager Name' value={this.state.managerName} onChange={this.handleManagerNameChange} />
        <input className='form--item' type='text' placeholder ='Business Name' value={this.state.businessName} onChange={this.handleBusinessNameChange} />
        <textarea className='form--item messageField' name ='message' form ='settingsForm' defaultValue=' I hope you enjoyed your visit and will come see us again soon. 
        In the meantime, could you do me a personal favor and leave us a review? 
        Here is a link that will make it easy:' />
        <input className='form--item' type='text' placeholder='Old Password' value={this.state.oldPW} onChange={this.handleOldPWChange} />
        <input className='form--item' type='text' placeholder='New Password' value={this.state.newPW} onChange={this.handleNewPWChange} />
        <button className='button'>Save</button>
      </form>
    </div> 
    );
  }
  
}

export default Settings;