import React, { Component } from 'react';

class Settings extends Component {
  constructor () {
    super();

    this.state = {
      managerFirstName: '',
      managerLastName: '',
      businessName: '',
      reviewSite: '',
      oldPW: '',
      newPW: '',
    };
  }

  handleManagerFirstNameChange = (e) => {
    this.setState({
      managerFirstName: e.target.value
    });
  }

  handleManagerLastNameChange = (e) => {
    this.setState({
      managerLastName: e.target.value
    });
  }

  handleBusinessNameChange = (e) => {
    this.setState({
      businessName: e.target.value
    });
  }

  handleReviewSiteChange = (e) => {
    console.log('reached function');
    this.setState({
      reviewSite: e.target.value
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

      <div className='header'>Here is Our Basic Greeting. Feel Free To Change It However You'd Like!</div>
      <div className='sampleMessage'>Hello, this is <span className='filler'>{this.state.managerFirstName || this.state.managerLastName ? this.state.managerFirstName + ' ' + this.state.managerLastName : 'Your Name Here'}</span> from <span className='filler'>{this.state.businessName ? this.state.businessName : 'Your Business\' Name Here'}</span>. 
      Thank you for coming in today! I hope you enjoyed your visit and will come see us again soon. 
      In the meantime, could you do me a favor and leave us a review? Here is a link that will make it easy: <span className='filler'>{this.state.reviewSite ? this.state.reviewSite : 'Your Review Site Choice Here'}</span>. Thank You!</div>
      
      <form className='form' id='settingsForm'>
        <div>
          <input className='form--item' type='text' placeholder='Manager First Name' value={this.state.managerFirstName} onChange={this.handleManagerFirstNameChange} />
          <input className='form--item' type='text' placeholder='Manager Last Name' value={this.state.managerLastName} onChange={this.handleManagerLastNameChange} />
        </div>
        <div><input className='form--item' type='text' placeholder ='Business Name' value={this.state.businessName} onChange={this.handleBusinessNameChange} /></div>

        <select className='dropdownList' id ='selectReviewSite' onChange={this.handleReviewSiteChange}>
          <option value ='null' selected disabled>Select A Review Site</option>
          <option value='https://www.yelp.com/'>Yelp</option>
          <option value='https://www.google.com/business/'>Google Places</option>
          <option value='https://www.tripadvisor.com/'>TripAdvisor</option>
        </select>

        <div><textarea className='form--item messageField' name ='message' form ='settingsForm' defaultValue=' Thank you for coming in today! I hope you enjoyed your visit and will come see us again soon. 
        In the meantime, could you do me a favor and leave us a review? 
        Here is a link that will make it easy:' /></div>

        <div><input className='form--item' type='text' placeholder='Old Password' value={this.state.oldPW} onChange={this.handleOldPWChange} /></div>
        <div><input className='form--item' type='text' placeholder='New Password' value={this.state.newPW} onChange={this.handleNewPWChange} /></div>
        <button className='button'>Save</button>
      </form>

    </div> 
    );
  }
  
}

export default Settings;