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

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // onClick = () => {}

  render() {
    return (
    <div className='component'>
      <div className='title'>Send a New Invitation</div>
      <form className='form'>
        <div><input className='form--item' type='text' name='firstName' value={this.state.firstName} onChange={this.handleInputChange} placeholder="Customer First Name"/></div>
        <div><input className='form--item' type='text' name='lastName' value={this.state.lastName} onChange={this.handleInputChange} placeholder="Customer Last Name"/></div>
        <div><input className='form--item' type='text' name='phoneNumber' value={this.state.phoneNumber} onChange={this.handleInputChange} placeholder="Phone Number"/></div>
        <button className='button'>Invite</button>
      </form>
    </div> 
    );
  }
  
}

export default Invitations;