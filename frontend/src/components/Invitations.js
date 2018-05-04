import React, {Component} from 'react';
import axios from 'axios';
const URL = 'http://localhost:5000/';

let companyId;
let reviewOption;

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
    companyId = '5ae786b9740f794d9c2e8488'; // testing purposes
    reviewOption = 'test'; // testing purposes
    
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const tel = e.target.phoneNumber.value;
    
    // create a customer object with inputted data to send to customer API endpoint
    const customer = {
      firstName : e.target.firstName.value,
      lastName: e.target.lastName.value,
      phoneNumber: e.target.phoneNumber.value,
      requestSent : {
        affiliatedCompanyId: companyId,
        reviewPlatformSent: reviewOption,
        clicked: false,
        reviewScore: '0',
      }
    };
    //TODO: add new data to existing customer if she already exists in DB

    // save customer data to the DB
    axios.post(URL + 'customers/', customer)
      .then(response => {
        console.log("successfully added");
        
        // activate the text to go to the customer
        axios.post(URL + 'sms/' + tel)
        .then(response => {
          console.log("Sent!");
        })
        .catch(error => {
          console.log("error:", error);
        });

      })
      .catch(error => {
        console.log("error:", error);
      });


    
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