import React, {Component} from 'react';
import axios from 'axios';
const URL = 'http://localhost:5000/';

let companyId;
let reviewOption;
let tel;

class Invitations extends Component {
  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
    };
  }

  componentDidMount() {
    companyId = '5aec8c2e3ff7d51c1039b0bb'; // testing purposes
    reviewOption = 'test'; // testing purposes
    tel = '7032001337'; //testing purposes 
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  sendText = () => {
    axios.post(URL + 'sms/' + tel)
    .then(response => {
      console.log("Sent!");
    })
    .catch(error => {
      console.log("error:", error);
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    tel = e.target.phoneNumber.value;
    
    // create a customer object with inputted data to send to customer API endpoint
    const customer = {
      firstName : e.target.firstName.value,
      lastName: e.target.lastName.value,
      phoneNumber: e.target.phoneNumber.value,
      requestSent : [{
        affiliatedCompanyId: companyId,
        reviewPlatformSent: reviewOption,
        clicked: false,
        reviewScore: '0',
      },]
    };

    // check DB to see if user already exists
    axios.get(URL + 'customers/phone/' + tel)
      .then(response => {
        // check if user exists
        if (response.data) { 
          if (customer.firstName !== response.data.firstName || customer.lastName !== response.data.lastName) { // someone else is using this phone number already
            alert("Sorry, that phone number is already in use!");
            //this user exists in the db already, can be added to
          } else {
            console.log(response.data.requestSent[0].affiliatedCompanyId);
            //this user exists in the db for this company
            if (response.data.requestSent[0].affiliatedCompanyId === companyId) {
              alert('this is a repeat customer, just send them a text again');
            // this user exists in the db but not for this company, PUT request with updated requestSend data
            } else { 
              alert('this is a new customer, save new company data to end of requestSent and PUT to DB');
              const updatedCustomer = {
                firstName : customer.firstName,
                lastName: customer.lastName,
                phoneNumber: customer.phoneNumber,
                requestSent : [ ...response.data.requestSent,
                  {
                    affiliatedCompanyId: customer.requestSent[0].affiliatedCompanyId,
                    reviewPlatformSent: customer.requestSent[0].reviewPlatformSent,
                    clicked: false,
                    reviewScore: '0',
                  },
                ]
              };
              console.log(updatedCustomer);
              // PUT request with updated customer data
              axios.put(URL + 'customers/id/' + response.data._id, updatedCustomer)
                .then(response => {
                  console.log("Updated the customer");
                  this.sendText();
                })
                .catch(error => {
                  console.log("Error:", error.message);
                })
            }
          }
        } else { // brand new customer, not in DB
          // save customer data to the db
          axios.post(URL + 'customers/', customer)
          .then(response => {
            console.log("successfully added");
            // activate the text to go to the customer
            this.sendText();
          })
          .catch(error => {
            console.log("error:", error);
          });
        }

      })
      .catch(error => {
        console.log({ error });
      });


    // save customer data to the DB


    
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