import React, {Component} from 'react';
import axios from 'axios';
import ROOT_URL from '../utils/config.js';

let companyId;
let reviewOption;
let messageToSend = {};

class Invitations extends Component {
  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      managerName: '',
      businessName: '',
      message: '',
      reviewSite: '',
    };
  }

  componentWillMount() {
    companyId = '5aec8c2e3ff7d51c1039b0bb'; // testing purposes
    reviewOption = 'test'; // testing purposes

    axios.get(ROOT_URL + 'companies/id/' + companyId)
      .then(response => {
        const data = response.data;
        this.setState({
          managerName: data.contactFirstName + ' ' + data.contactLastName,
          businessName: data.name,
          message: data.defaultMessage,
          reviewSite: data.reviewSite, 
        })

        messageToSend = { messageContent: 'Hello, this is ' + this.state.managerName + ' from ' + this.state.businessName + '. ' + this.state.message + this.state.reviewSite + '. Thank you!' };
        console.log(messageToSend);
      })
      .catch(error => {
        console.log('error while getting company db info');
      })
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  createCustomer = (e) => {
    return {
      firstName : e.target.firstName.value,
      lastName: e.target.lastName.value,
      phoneNumber: e.target.phoneNumber.value,
      requestSent : [
        {
          affiliatedCompanyId: companyId,
          reviewPlatformSent: reviewOption,
          clicked: false,
          reviewScore: '0',
        },
      ]
    };
  }

  updateCustomer = (e) => {
  return {
      firstName : e.target.firstName.value,
      lastName: e.target.lastName.value,
      phoneNumber: e.target.phoneNumber.value,
      requestSent : [
        ...existingData.requestSent,
        {
          affiliatedCompanyId: companyId,
          reviewPlatformSent: reviewOption,
          clicked: false,
          reviewScore: '0',
        },
      ]
    };
  }
  
  saveNewCustomer = (cust) => {
    console.log(cust);
    axios.post(ROOT_URL + 'customers', cust)
    .then(response => {
      this.sendText(cust);
      this.resetState();
    })
    .catch(error => {
      console.log("error:", error);
    });
  }

  saveUpdatedCustomer = (cust, id) => {
    axios.put(ROOT_URL + 'customers/id/' + id, cust)
    .then(response => {
      console.log("Updated the customer");
      this.sendText(cust);
      this.resetState();
    })
    .catch(error => {
      console.log("Error:", error.message);
    })
  }

  checkIfCustomerExistsForThisCompany = (currentRequests) => {
    let flag = false;
    for (let i = 0; i < currentRequests.length; i++) {
      if (currentRequests[i].affiliatedCompanyId === companyId)
      {
        flag = true;
      }
    }
    return flag;
  }

  checkIfCustomerExists = (e, customer) => {
    axios.get(ROOT_URL + 'customers/phone/' + customer.phoneNumber)
      .then(response => {
        if (response.data) { // existing customer
          if (customer.firstName !== response.data.firstName || customer.lastName !== response.data.lastName) { // someone else is using this phone number already
            alert("Sorry, that phone number is already in use!");
          } else {
            let flag = this.checkIfCustomerExistsForThisCompany(response.data.requestSent);
            if (flag) {
              alert('this is a repeat customer, we\'ll just send them a text again');
              this.sendText(customer);
            } else { 
              alert('this is a new customer, save new company data to end of requestSent and PUT to DB');
              let updatedCustomer = this.updateCustomer(e, response.data);
              this.saveUpdatedCustomer(updatedCustomer, response.data._id);
            }
          }
        } else { // brand new customer, not in DB
          this.saveNewCustomer(customer);
        }
      })
      .catch(error => {
        console.log({ error });
      });
  }

  sendText = (cust) => {
    axios.post(ROOT_URL + 'sms/' + cust.phoneNumber, messageToSend)
    .then(response => {
      console.log("Sent!");
    })
    .catch(error => {
      console.log("error:", error);
    });
  }

  resetState = () => {
    this.setState({
      firstName: '',
      lastName: '',
      phoneNumber: '',
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    e.persist();
    let customer = this.createCustomer(e);
    this.checkIfCustomerExists(e, customer);
   
  }

  render() {
    return (
    <div className='component'>
      <div className='title'>Send a New Invitation</div>
      <form className='form' onSubmit={this.handleSubmit}>
        <div><input className='form--item' type='text' id='firstName' name='firstName' value={this.state.firstName} onChange={this.handleInputChange} placeholder="Customer First Name"/></div>
        <div><input className='form--item' type='text' id='lastName' name='lastName' value={this.state.lastName} onChange={this.handleInputChange} placeholder="Customer Last Name"/></div>
        <div><input className='form--item' type='text' id='phoneNumber' name='phoneNumber' value={this.state.phoneNumber} onChange={this.handleInputChange} placeholder="Phone Number"/></div>
        <button className='button'>Invite</button>
      </form>
    </div> 
    );
  }
  
}

export default Invitations;