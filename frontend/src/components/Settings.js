import React, { Component } from 'react';
import axios from 'axios';

import ROOT_URL from '../utils.config.js';
let companyId;
let defaultMessage;
let company;

class Settings extends Component {
  constructor () {
    super();

    this.state = {
      managerFirstName: '',
      managerLastName: '',
      businessName: '',
      reviewSite: '',
      message: '',
      oldPW: '',
      newPW: '',
    };
  }

  componentWillMount() {
    companyId = '5aec8c2e3ff7d51c1039b0bb'; // testing purposes
    axios.get(ROOT_URL + 'companies/id/' + companyId)
      .then(response => {
        console.log(response.data.defaultMessage);
        company = response.data;
        this.setState({
          message: company.defaultMessage,
          managerFirstName: company.contactFirstName,
          managerLastName: company.contactLastName,
          businessName: company.name,
          reviewSite: company.reviewSite,
        });
      })
      .catch(error => {
        console.log('error here');
      });
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  resetMessage = (e) => {
    this.setState({
      message: defaultMessage 
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    company.defaultMessage = this.state.message;
    company.contactFirstName = this.state.managerFirstName;
    company.contactLastName = this.state.managerLastName;
    company.reviewSite =  this.state.reviewSite;
    axios.put(ROOT_URL + 'companies/id/' + companyId, company)
      .then(response => {
        console.log("updated the company");
      })
      .catch(error => {
        console.log("error while updating company");
      });
  }


  render() {
    return (
    <div className='component'>
      <div className='title'>Create Your Personalized Message</div>

      <div className='header'>Here is Our Basic Greeting. Feel Free To Change It However You'd Like!</div>
      <div className='sampleMessage' id='sampleMessage'>
        Hello. This is {this.state.managerFirstName} {this.state.managerLastName} from {this.state.businessName}. {this.state.message} {this.state.reviewSite}. Thank you!
      </div>
      
      <form className='form' id='settingsForm'>
        {/* TODO: once we have sign-in and auth these lines should be eliminated and be brought up from db */}
        <div><input className='form--item' type='text' name='managerFirstName' value={this.state.managerFirstName} onChange={this.handleInputChange} /></div>
        <div><input className='form--item' type='text' name='managerLastName' value={this.state.managerLastName} onChange={this.handleInputChange} /></div>
        <div><input className='form--item' type='text' name='businessName' value={this.state.businessName} onChange={this.handleInputChange} /></div>

        {/* creates a dropdown menu of possible review sites to choose from */}
        <select className='dropdownList' id ='selectReviewSite' name='reviewSite' onChange={this.handleInputChange}>
          <option value ='null' selected disabled>Select A Review Site</option>
          <option value='https://www.yelp.com/'>Yelp</option>
          <option value='https://www.google.com/business/'>Google Places</option>
          <option value='https://www.tripadvisor.com/'>TripAdvisor</option>
        </select>

        {/* allows user to edit or completely re-write the pre-programmed message text */}
        <div><textarea className='form--item messageField' name ='message' form ='settingsForm' onChange={this.handleInputChange}
        value={this.state.message} /></div>
        <button className="button" type="button" onClick={this.resetMessage}>Reset Message to Default</button>

        {/* TODO: once we have sign-in and auth these lines should be eliminated, or moved elsewhere */}
        <div><input className='form--item' type='password' placeholder='Old Password' name='oldPW' value={this.state.oldPW} onChange={this.handleInputChange} /></div>
        <div><input className='form--item' type='password' placeholder='New Password' name='newPW' value={this.state.newPW} onChange={this.handleInputChange} /></div>
        <button className='button' type="button" onClick={this.handleSubmit}>Save Your Template</button>
      </form>

    </div> 
    );
  }
  
}

export default Settings;