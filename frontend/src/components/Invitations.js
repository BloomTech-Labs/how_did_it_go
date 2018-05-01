import React, {Component} from 'react';

class Invitations extends Component {
  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
    };
  }

  handleFirstNameChange = (e) => {
    this.setState({
      firstName: e.target.value
    });
  }

  handleLastNameChange = (e) => {
    this.setState({
      lastName: e.target.value
    });
  }

  handlePhoneNumberChange = (e) => {
    this.setState({
      phoneNumber: e.target.value
    });
  }

  // onClick = () => {}

  render() {
    return (
    <div className='component'>
      <div className='title'>Send a New Invitation</div>
      <form className='form'>
        <input className='form--item' type='text' value={this.state.firstName} onChange={this.handleFirstNameChange} placeholder="Customer First Name"/>
        <input className='form--item' type='text' value={this.state.lastName} onChange={this.handleLastNameChange} placeholder="Customer Last Name"/>
        <input className='form--item' type='text' value={this.state.phoneNumber} onChange={this.handlePhoneNumberChange} placeholder="Phone Number"/>
        <button className='button'>Invite</button>
      </form>
    </div> 
    );
  }
  
}

export default Invitations;