//import axios from 'axios';
import React, { Component } from 'react';

// let companyId;
// let defaultMessage;
// let company;

class Billing extends Component {
    constructor () {
        super();
    
        this.state = {
          managerFirstName: '',
          managerLastName: '',
          businessName: '',
          address: '',
        };
      }
    
      componentWillMount() {
    //     companyId = '5aec8c2e3ff7d51c1039b0bb'; // testing purposes
    //     axios.get(ROOT_URL + 'companies/id/' + companyId)
    //       .then(response => {
    //         console.log(response.data.defaultMessage);
    //         company = response.data;
    //         this.setState({
    //           managerFirstName: company.contactFirstName,
    //           managerLastName: company.contactLastName,
    //           businessName: company.name,
    //           address: company.address,
    //         });
    //       })
    //       .catch(error => {
    //         console.log('error here');
    //       });
      }
    
      handleInputChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }
    
    
      handleSubmit = (e) => {
        e.preventDefault();
        // update billing information
        // axios put to update company information
      }

    render() {
        return(
            <div>
                <div className='title'>Change Your Billing Information</div>
                <form>
                  <input type='text' className='form--item' name='businessName' placeholder='Business Name' />
                  <input type='text' className='form--item' name='address' placeholder='Address' />
                  <button type='button' className='button'>Update</button>
                </form>
            </div>
        );
    }
}

export default Billing;