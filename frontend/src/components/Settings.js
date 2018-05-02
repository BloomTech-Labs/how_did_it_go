import React, { Component } from 'react';

const DEFAULT_MESSAGE = 'Thank you for coming in today! I hope you enjoyed your visit and will come see us again soon. In the meantime, could you do me a favor and leave us a review? Here is a link that will make it easy: ';
class Settings extends Component {
  constructor () {
    super();

    this.state = {
      managerFirstName: '',
      managerLastName: '',
      businessName: '',
      reviewSite: '',
      message: DEFAULT_MESSAGE,
      oldPW: '',
      newPW: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  resetMessage = (e) => {
    this.setState({
      message: DEFAULT_MESSAGE 
    });
  }


  render() {
    return (
    <div className='component'>
      <div className='title'>Create Your Personalized Message</div>

      <div className='header'>Here is Our Basic Greeting. Feel Free To Change It However You'd Like!</div>
      <div className='sampleMessage'>
        Hello, this is  
        <span>{this.state.managerFirstName || this.state.managerLastName ? ' ' + this.state.managerFirstName + ' ' + this.state.managerLastName + ' ' :<span className='filler'> Your Name Here </span>}</span>
        from  
        <span>{this.state.businessName ? ' ' + this.state.businessName : <span className='filler'> Your Business' Name Here </span>}</span>
        . 
        <span>{' ' + this.state.message + ' '}</span>
        <span>{this.state.reviewSite ? this.state.reviewSite + ' ' : <span className='filler'> Your Review Site Choice Here </span>}</span>
         Thank You!
      </div>
      
      <form className='form' id='settingsForm'>
        <div>
          <input className='form--item' type='text' placeholder='Manager First Name' name='managerFirstName' value={this.state.managerFirstName} onChange={this.handleInputChange} />
          <input className='form--item' type='text' placeholder='Manager Last Name' name='managerLastName' value={this.state.managerLastName} onChange={this.handleInputChange} />
        </div>
        <div><input className='form--item' type='text' placeholder ='Business Name' name='businessName' value={this.state.businessName} onChange={this.handleInputChange} /></div>

        <select className='dropdownList' id ='selectReviewSite' name='reviewSite' onChange={this.handleInputChange}>
          <option value ='null' selected disabled>Select A Review Site</option>
          <option value='https://www.yelp.com/'>Yelp</option>
          <option value='https://www.google.com/business/'>Google Places</option>
          <option value='https://www.tripadvisor.com/'>TripAdvisor</option>
        </select>

        <div><textarea className='form--item messageField' name ='message' form ='settingsForm' onChange={this.handleInputChange}
        value={this.state.message} /></div>
        <button className="button" type="button" onClick={this.resetMessage}>Reset Message to Default</button>

        <div><input className='form--item' type='password' placeholder='Old Password' name='oldPW' value={this.state.oldPW} onChange={this.handleInputChange} /></div>
        <div><input className='form--item' type='password' placeholder='New Password' name='newPW' value={this.state.newPW} onChange={this.handleInputChange} /></div>
        <button className='button'>Save Your Template</button>
      </form>

    </div> 
    );
  }
  
}

export default Settings;