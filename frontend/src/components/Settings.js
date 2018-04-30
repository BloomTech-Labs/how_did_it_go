import React, { Component } from 'react';

class Settings extends Component {
  constructor () {
    super();

    this.state = {
      managerName: '',
      businessName: '',
      oldPW: '',
      newPW: '',
    };
  }

  handleManagerNameChange = (e) => {
    this.setState({
      managerName: e.target.value
    });
  }

  handleBusinessNameChange = (e) => {
    this.setState({
      businessName: e.target.value
    });
  }

  handleOldPWChange = (e) => {
    this.setState({
      oldPW: e.target.value
    });
  }

  handleNewPWChange = (e) => {
    this.setState({
      newPW: e.target.value
    });
  }

  render() {
    return (
    <div>
      <div>
        Manager Name:
        <input type='text' value={this.state.managerName} onChange={this.handleManagerNameChange} />
      </div>
      <div>
        Business Name:
        <input type='text' value={this.state.businessName} onChange={this.handleBusinessNameChange} />
      </div>
      <div>
        Message Content:
        <p>Hey, this is {this.state.managerName} from {this.state.businessName}. Thank you for comming
        in today! I hope you enjoyed your visit and will come see us again soon. In the meantime,
        could you do me a personal favor and leave us a review? Here is a link that will make it easy:
        </p>
      </div>
      <div>
        Old Password:
        <input type='text' value={this.state.oldPW} onChange={this.handleOldPWChange} />
      </div>
      <div>
        New Password:
        <input type='text' value={this.state.newPW} onChange={this.handleNewPWChange} />
      </div>
      <button>Save</button>
    </div> 
    );
  }
  
}

export default Settings;