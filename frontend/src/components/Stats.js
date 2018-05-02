import React, {Component} from 'react';
import axios from 'axios';

const URL = "http://localhost:5000/";

class Stats extends Component {
  constructor() {
    super();
    this.state = {
<<<<<<< HEAD
      companyName: 'TestCo1',
=======
>>>>>>> 20e3e105ed90f3c82b7aff9955ac7ae27e273f49
      data: [],
      invitationsSent: '',
      totalClicks: 0,
      details: false
    };
  }

  componentDidMount() {
<<<<<<< HEAD
    axios.get(URL + 'customers/company/' + this.state.companyName)
=======
    axios.get(URL + 'customers/')
>>>>>>> 20e3e105ed90f3c82b7aff9955ac7ae27e273f49
      .then(response => {
        this.setState({ data: response.data});
        this.setState({ invitationsSent: response.data.length });
        this.updateClicks();
      })
      .catch(error => {
        console.log(error.message);
      });
      
  }
  
  updateClicks() {
    let count = 0;
    this.state.data.map(item => {
      count = item.requestSent.clicked ? count+1 : count;
      return null;
    })
    this.setState({ totalClicks: count });
  }

<<<<<<< HEAD
  toggle = (e) => {
    const details = !this.state.details;
    this.setState({ details });
  }

=======
>>>>>>> 20e3e105ed90f3c82b7aff9955ac7ae27e273f49
  render() {
    return (
    <div className='component'>
      <div className='title'>Stats</div>
      <div className='content'>Invitations Sent: {this.state.invitationsSent}</div>
      <div className='content'>Total Clicks: {this.state.totalClicks}</div>
<<<<<<< HEAD
      <div className='content customerStats' onClick={this.toggle}>{ this.state.details ? 
        <div>
          { this.state.data.map((item, index) => 
            <div key = {index}>{ item.firstName  + ' ' + item.lastName } : Clicked the Link? { item.requestSent.clicked ? 'Yes' : 'No' }</div>
            ) 
          }
        </div>
        : 'Click Here for More Details' } </div>
=======
      <div className='content'>
        { this.state.data.map((item, index) => 
          <div key = {index}>{ item.firstName  + ' ' + item.lastName } Clicked? : { item.requestSent.clicked ? 'TRUE' : 'FALSE' }</div>
          ) 
        }
      </div>
>>>>>>> 20e3e105ed90f3c82b7aff9955ac7ae27e273f49
    </div> 
    );
  }
}

export default Stats;