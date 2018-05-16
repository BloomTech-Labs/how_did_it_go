import axios from 'axios';
import React, { Component } from 'react';
//import ROOT_URL from '.../utils/config.js';

const ROOT_URL = 'http://localhost:5000/';
const DEFAULT_MESSAGE = 'Thank you for coming in today! I hope you enjoyed your visit and will come see us again soon. In the meantime, could you do me a favor and leave us a review? Here is a link that will make it easy: ';
 

let company = {};
let defaultMessage;
let companyFound = false;

class Message extends Component{
    constructor (props) {
        super(props);

        this.state = {
            user: this.props.user,
            userid: '',
            managerFirstName: '',
            managerLastName: '',
            businessName: '',
            message: '',
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
            companyFound = true;
            console.log('company affiliated: ', response.data);
            company = response.data;
            this.setState({
                message: company.defaultMessage,
                managerFirstName: company.contactFirstName,
                managerLastName: company.contactLastName,
                businessName: company.name,
            });
        })
        .catch(error => {
            console.log('error finding company: ', error);
            this.setState({
                message: DEFAULT_MESSAGE,
                managerFirstName: 'Enter Manager First Name',
                managerLastName: 'Enter Manager Last Name',
                businessName: 'Enter Company Name',                          
            });
        })
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    resetMessage = (e) => {
        this.setState({
            message: DEFAULT_MESSAGE, 
        });
    }


    handleSubmit = (e) => {
        e.preventDefault();
        company.defaultMessage = this.state.message;
        company.name = this.state.businessName;
        company.contactFirstName = this.state.managerFirstName;
        company.contactLastName = this.state.managerLastName;

        if (companyFound) {
            axios.put(ROOT_URL + 'companies/id/' + company.id, company)
            .then(response => {
            console.log("updated the company");
            })
            .catch(error => {
            console.log("error while updating company");
            });
        } else {
            company.contactEmail = this.state.user;
            company.userID = this.state.userid;
            axios.post(ROOT_URL + 'companies', company)
                .then(response => {
                    console.log('created new company');
                    companyFound = true;
                })
                .catch(error => {
                    console.log('error creating new company: ', error);
                });
        }
    }

    render() {
        return(
            <div>
                <div className='title'>Create Your Personalized Message</div>

                <div className='header'>Here is Our Basic Greeting. Feel Free To Change It However You'd Like!</div>
                <div className='sampleMessage' id='sampleMessage'>
                    Hello. This is {this.state.managerFirstName} {this.state.managerLastName} from {this.state.businessName}. {this.state.message}
                </div>

                <form className='form' id='settingsForm'>
                {/* allows user to enter or update db data about company */}
                <div><input className='form--item' type='text' name='managerFirstName' value={this.state.managerFirstName} onChange={this.handleInputChange} /></div>
                <div><input className='form--item' type='text' name='managerLastName' value={this.state.managerLastName} onChange={this.handleInputChange} /></div>
                <div><input className='form--item' type='text' name='businessName' value={this.state.businessName} onChange={this.handleInputChange} /></div>

                {/* allows user to edit or completely re-write the pre-programmed message text */}
                <div><textarea className='form--item messageField' name ='message' form ='settingsForm' onChange={this.handleInputChange}
                value={this.state.message} /></div>
                <button className="button" type="button" onClick={this.resetMessage}>Reset Message to Default</button>
                <button className='button' type="button" onClick={this.handleSubmit}>Save Your Template</button>
                </form>
            </div>
        );
    }
}

export default Message;