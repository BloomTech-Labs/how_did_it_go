import React, {Component} from 'react';
import axios from 'axios';
import ROOT_URL from '../utils/config.js';

let company = {};
let messageToSend = {};

class Invitations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      userid: '',
      managerFirstName: '',
      managerLastName: '',
      businessName: '',
      message: '',
      platForms: [],
      reviewSite: '',
    };
  }

  componentWillMount() {
    axios.get(ROOT_URL + 'users/' + this.state.user)
        .then(response => {
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
          console.log('company affiliated: ', response.data);
          company = response.data;
          console.log('company id: ', company.id);
          this.setState({
              message: company.defaultMessage,
              managerFirstName: company.contactFirstName,
              managerLastName: company.contactLastName,
              businessName: company.name,
          });
          this.getPlatForms();
      })
      .catch(error => {
          console.log('error finding company: ', error);
      })
      
  }

  getPlatForms = () => {
      axios
        .get(ROOT_URL + "companies/" + company.id + "/platforms")
        .then(result => {
          const detail = result.data;
          this.setState({ platForms: detail.platForms });
          this.setReviewSite();
        })
        .catch(error => {
          console.log("Errors while getting company platForms infomation");
        });
    };

  setReviewSite = () => {
    const length = this.state.platForms.length;
    if (length === 1) {
      this.setState({ reviewSite: this.state.platForms });
    } else if (length > 1) {
      const randomNum = Math.floor(Math.random() * Math.floor(length));
      this.setState({ reviewSite: this.state.platForms[randomNum] });
    } else {
      console.log('platforms empty');
    }
    console.log(this.state.reviewSite);
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
    };
  }

  getCustomer = () => {
    axios.get(ROOT_URL + 'customers/phone/' + this.state.phoneNumber)
      .then(response => {
        const customer = response.data;
        return customer;
      })
      .catch(error => {
        console.log('error finding customer: ', error);
      })
  }

  falseCustomerData = (currentCustomer, dbCustomer) => {
    if (currentCustomer.firstName !== dbCustomer.firstName || currentCustomer.lastName !== dbCustomer.lastName) {
      return true;
    }
  }

  checkForInvitation = (customer) => {
    let flag = false;
    axios.get(ROOT_URL + 'invitations/customerid/' + customer.id)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log('error finding invitations: ', error);
      });
    return flag;
  }

  createInvitation = (customer) => {
    console.log('customer id: ', customer.id);
    const invitation = {
      platFormID: this.state.reviewSite.id,
      customerID: customer.id,
    };
    axios.post('invitations', invitation)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log('error creating invitation: ', error);
      });
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

  checkIfCustomerExists = (customer) => {
    const customerFound = this.getCustomer();
    if (customerFound) {
      if (this.falseCustomerData(customer, customerFound)) {
        alert("Sorry, that phone number is already in use");
      } else if (!this.checkForInvitation(customerFound)){
          this.createInvitation(customerFound);
          this.sendText(customerFound);
      } else { // customer exists and was recently texted
        return null;
      }
    } else { // brand new customer, not in DB
    this.saveNewCustomer(customer);
    this.createInvitation(customerFound);
    this.sendText(customerFound);
    }
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
    messageToSend = { messageContent: 'Hello, this is ' + this.state.managerName + ' from ' + this.state.businessName + '. ' + this.state.message + this.state.reviewSite + '. Thank you!' };
    let customer = this.createCustomer(e);
    this.checkIfCustomerExists(customer);
   
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