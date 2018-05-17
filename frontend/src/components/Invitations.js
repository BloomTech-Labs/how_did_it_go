import React, {Component} from 'react';
import axios from 'axios';
import ROOT_URL from '../utils/config.js';

let company = {};
let reviewOption;
let messageToSend = {};

class Invitations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      firstName: '',
      lastName: '',
      phoneNumber: '',
      managerName: '',
      businessName: '',
      message: '',
      reviewSite: '',
      companyId: '',
      platForms: [],
    };
  }

  componentWillMount() {
    axios.get(ROOT_URL + 'users/' + this.state.user)
        .then(response => {
          console.log('user: ', response.data);
            this.setState({ userid: response.data.id });
            this.getCompanyData();
            
        })
        .catch(error => {
            console.log(error);
        });
  }

  getCompanyData = () => {
      axios.get(ROOT_URL + 'companies/userid/' + this.state.userid)
      .then(response => {
          let company = response.data;
          console.log('company: ', company.id);
          this.setState({
              message: company.defaultMessage,
              managerFirstName: company.contactFirstName,
              managerLastName: company.contactLastName,
              businessName: company.name,
          });
      })
      .then(() => {
        this.getPlatforms();
      })
      .catch(error => {
          console.log('error finding company: ', error);
      })
  }

  getPlatforms = () => {
    axios
      .get(ROOT_URL + "companies/" + company.id + "/platforms")
      .then(result => {
        const detail = result.data;
        this.setState({ platForms: detail.platForms });
        console.log("Retrieved platForms successfully!");
        console.log('platforms: ', this.state.platForms);
      })
      .catch(error => {
        console.log("Errors while getting company platForms infomation");
      });
  }

  setReviewSite = () => {
    console.log('reached');
    const length = this.state.platForms.length;
    if (length === 1) {
      this.setState({ reviewSite: this.state.platForms });
    } else if (length > 1) {
      const randomNum = Math.floor(Math.random() * Math.floor(length));
      console.log('random num: ', randomNum);
      this.setState({ reviewSite: this.state.platForms[randomNum] });
      console.log('review site: ', this.state.reviewSite);
    } else {
      console.log('platforms empty');
    }
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
          affiliatedCompanyId: this.state.companyId,
          reviewPlatformSent: this.state.reviewSite,
          clicked: false,
          reviewScore: '0',
        },
      ]
    };
  }

  updateCustomer = (e, existingData) => {
  return {
      firstName : e.target.firstName.value,
      lastName: e.target.lastName.value,
      phoneNumber: e.target.phoneNumber.value,
      requestSent : [
        ...existingData.requestSent,
        {
          affiliatedCompanyId: this.state.companyId,
          reviewPlatformSent: this.state.reviewSite,
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
      if (currentRequests[i].affiliatedCompanyId === company.id)
      {
        flag = true;
      }
    }
    return flag;
  }

  checkIfCustomerExists = (e, customer) => {
    axios.get(ROOT_URL + 'customers/phone/' + customer.phoneNumber)
      .then(response => {
        console.log('customer data response: ', response.data);
        if (response.data.length > 0) { // existing customer
          if (customer.firstName !== response.data.firstName || customer.lastName !== response.data.lastName) { // someone else is using this phone number already
            alert("Sorry, that phone number is already in use for " + response.data.firstName);
          } else {
            let flag = this.checkIfCustomerExistsForThisCompany(response.data.requestSent);
            if (flag) {
              alert('this is a repeat customer, we\'ll just send them a text again');
              this.sendText(customer);
            } else { 
              alert('this is a new customer, save new company data to end of requestSent and PUT to DB');
              let updatedCustomer = this.updateCustomer(e, response.data);
              this.saveUpdatedCustomer(updatedCustomer, response.data.id);
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
    this.setReviewSite();
    messageToSend = { messageContent: 'Hello, this is ' + this.state.managerName + ' from ' + this.state.businessName + '. ' + this.state.message + this.state.reviewSite + '. Thank you!' };
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